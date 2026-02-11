import React, { useEffect, useRef } from 'react';
import { useTheme } from '../app/theme';

interface RainOverlayProps {
    active: boolean;
}

interface Particle {
    x: number;
    y: number;
    l: number; // length
    v: number; // velocity
    a: number; // alpha/opacity
}

export const RainOverlay: React.FC<RainOverlayProps> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !active) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;

        const initParticles = () => {
            particles = [];
            const count = Math.floor(width / 4); // modest count
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    l: Math.random() * 20 + 10,
                    v: Math.random() * 4 + 2,
                    a: Math.random() * 0.3 + 0.1,
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            initParticles();
        };

        // Initial setup
        resize();

        const render = () => {
            // Clear
            ctx.clearRect(0, 0, width, height);

            // Color based on CSS variable would be ideal, but for canvas performance 
            // reading computed style every frame is bad. We'll read it once or infer.
            // Or just hardcode the mapped colors to match the CSS vars since we know them.
            // Luxe: 93, 109, 126 | Cute: 221, 160, 221
            const color = theme === 'cute' ? '221, 160, 221' : '93, 109, 126';

            ctx.strokeStyle = `rgba(${color}, 1)`; // alpha handled per particle
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                ctx.beginPath();
                ctx.globalAlpha = p.a;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x, p.y + p.l);
                ctx.stroke();

                // Update
                p.y += p.v;

                // Reset if off screen
                if (p.y > height) {
                    p.y = -p.l;
                    p.x = Math.random() * width;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [active, theme]);

    if (!active) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-in-out opacity-100"
            style={{ opacity: active ? 1 : 0 }}
        />
    );
};
