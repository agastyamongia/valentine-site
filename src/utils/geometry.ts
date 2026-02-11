export interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

// Check if two rects intersect with specific padding/margin
export function isOverlapping(rect1: Rect, rect2: Rect, margin: number = 0): boolean {
    return !(
        rect1.left > rect2.left + rect2.width + margin ||
        rect1.left + rect1.width + margin < rect2.left ||
        rect1.top > rect2.top + rect2.height + margin ||
        rect1.top + rect1.height + margin < rect2.top
    );
}

export function getSafePosition(
    me: { width: number; height: number },
    container: { width: number; height: number },
    obstacles: Rect[],
    padding: number = 24
): Point | null {
    // Basic random safe position (fallback)
    const maxAttempts = 50;
    const minX = padding;
    const maxX = container.width - me.width - padding;
    const minY = padding;
    const maxY = container.height - me.height - padding;

    if (maxX < minX || maxY < minY) return null;

    for (let i = 0; i < maxAttempts; i++) {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        const candidate: Rect = { left: x, top: y, width: me.width, height: me.height };

        if (!obstacles.some(obs => isOverlapping(candidate, obs, 20))) {
            return { x, y };
        }
    }
    return { x: minX, y: minY };
}

// Directional evasion: Try to move away from the cursor
export function getEvasivePosition(
    currentRect: Rect,
    container: { width: number; height: number },
    obstacles: Rect[],
    cursor: Point,
    hopDistance: number = 150
): Point | null {
    const padding = 24;
    const center = {
        x: currentRect.left + currentRect.width / 2,
        y: currentRect.top + currentRect.height / 2
    };

    // Vector from cursor to center
    let dx = center.x - cursor.x;
    let dy = center.y - cursor.y;

    // Normalize
    const length = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid divide by zero
    dx /= length;
    dy /= length;

    // Try angles in 30-degree increments (0, 30, -30, 60, -60, etc.)
    const angles = [
        0, 30, -30, 60, -60, 90, -90, 120, -120, 150, -150, 180
    ];

    // Safety bounds
    const minX = padding;
    const maxX = container.width - currentRect.width - padding;
    const minY = padding;
    const maxY = container.height - currentRect.height - padding;

    for (const angleDeg of angles) {
        const rad = (angleDeg * Math.PI) / 180;
        // Rotate vector
        const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
        const ry = dx * Math.sin(rad) + dy * Math.cos(rad);

        let targetX = currentRect.left + rx * hopDistance;
        let targetY = currentRect.top + ry * hopDistance;

        // Bounce logic: if out of bounds, reflect back inward
        if (targetX < minX) {
            targetX = minX + (minX - targetX); // Bounce off left wall
        } else if (targetX > maxX) {
            targetX = maxX - (targetX - maxX); // Bounce off right wall
        }

        if (targetY < minY) {
            targetY = minY + (minY - targetY); // Bounce off top wall
        } else if (targetY > maxY) {
            targetY = maxY - (targetY - maxY); // Bounce off bottom wall
        }

        // Final clamp to ensure we're still in bounds after bounce
        targetX = Math.max(minX, Math.min(targetX, maxX));
        targetY = Math.max(minY, Math.min(targetY, maxY));

        const candidate: Rect = { left: targetX, top: targetY, width: currentRect.width, height: currentRect.height };

        // Check obstacles
        // Increase margin slightly to ensure we don't land too close to Yes button
        if (!obstacles.some(obs => isOverlapping(candidate, obs, 30))) {
            // Also ensure we actually moved a reasonable distance from cursor?
            // The user wants "barely move out of range". 
            // If we clamped, we might be close.
            // Let's assume valid.
            return { x: targetX, y: targetY };
        }
    }

    // If completely stuck (cornered), teleport randomly
    return getSafePosition(
        { width: currentRect.width, height: currentRect.height },
        container,
        obstacles,
        padding
    );
}
