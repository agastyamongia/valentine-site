import React, { useState, useRef, useEffect } from 'react';
import { getEvasivePosition, type Point } from '../utils/geometry';

interface ValentineScreenProps {
    visible: boolean;
    onViewGallery?: () => void;
    onViewVideo?: () => void;
}

export const ValentineScreen: React.FC<ValentineScreenProps> = ({ visible, onViewGallery, onViewVideo }) => {
    const [noBtnPos, setNoBtnPos] = useState<Point | null>(null);
    const [yesAccepted, setYesAccepted] = useState(false);

    const dodgeTexts = [
        "No",
        "Nope",
        "Nice try",
        "😂",
        "You really think you can fade me",
        "stfu",
        "just press yes",
        "ykywm",
        "😘",
        "ok this is getting ridiculous",
        "RAINA WTF CLICK YES",
        "alr go find urself another man",
        "jk please hit yes",
        "these r gonna cycle now..."
    ];
    const [dodgeCount, setDodgeCount] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const yesBtnRef = useRef<HTMLButtonElement>(null);
    const noBtnRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const lastDodgeTime = useRef<number>(0); // Cooldown to prevent rapid dodges

    // Reset when screen becomes visible
    useEffect(() => {
        if (visible && !yesAccepted) {
            setNoBtnPos(null);
            setDodgeCount(0);
        }
    }, [visible, yesAccepted]);

    const handleDodge = (mousePos: Point) => {
        // Cooldown: only dodge once every 400ms max
        const now = Date.now();
        if (now - lastDodgeTime.current < 400) return;
        lastDodgeTime.current = now;

        if (containerRef.current && noBtnRef.current && yesBtnRef.current && textRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const btnRect = noBtnRef.current.getBoundingClientRect();
            const yesRect = yesBtnRef.current.getBoundingClientRect();
            const textRect = textRef.current.getBoundingClientRect();

            // Convert DOM rects to relative Rects for collision logic (relative to container)
            const obstacles = [
                { left: yesRect.left - containerRect.left, top: yesRect.top - containerRect.top, width: yesRect.width, height: yesRect.height },
                { left: textRect.left - containerRect.left, top: textRect.top - containerRect.top, width: textRect.width, height: textRect.height }
            ];

            const currentLeft = btnRect.left - containerRect.left;
            const currentTop = btnRect.top - containerRect.top;

            // Use actual button dimensions for more accurate collision
            const newPos = getEvasivePosition(
                { left: currentLeft, top: currentTop, width: btnRect.width, height: btnRect.height },
                { width: containerRect.width, height: containerRect.height },
                obstacles,
                mousePos,
                1000 // Nudge distance (larger to ensure button moves far enough)
            );

            if (newPos) {
                setNoBtnPos(newPos);
                setDodgeCount(c => c + 1);
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (yesAccepted) return;
        if (!noBtnRef.current) return;

        const rect = noBtnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (dist < 100) {
            if (containerRef.current) {
                const cRect = containerRef.current.getBoundingClientRect();
                const mouseRel = {
                    x: e.clientX - cRect.left,
                    y: e.clientY - cRect.top
                };
                handleDodge(mouseRel);
            }
        }
    };

    if (!visible) return null;

    const textIndex = dodgeCount % dodgeTexts.length;
    const btnText = dodgeTexts[textIndex];

    // Common button classes
    const noBtnClasses = `
        px-8 py-3 rounded-theme border border-accent/30 text-accent bg-white/50 backdrop-blur-sm
        transition-all duration-150 font-medium whitespace-nowrap hover:bg-accent/10
    `;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {yesAccepted ? (
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-serif text-text mb-4">YAY ❤️</h1>
                    <p className="text-accent text-lg">I hate that we're BOTH in India right now,</p>
                    <p className="text-accent text-lg mb-6">yet we cannot see each other.</p>
                    <p className="text-accent text-lg mb-8">I love you, and hope you're having so much fun at the wedding!</p>

                    {/* Gallery Button */}
                    {onViewGallery && (
                        <button
                            onClick={onViewGallery}
                            className="mt-4 px-6 py-3 bg-accent/10 hover:bg-accent hover:text-white border border-accent text-accent rounded-full transition-all duration-300 font-medium tracking-wide"
                        >
                            ✨ Gallery ✨
                        </button>
                    )}

                    {/* Video Button */}
                    {onViewVideo && (
                        <button
                            onClick={onViewVideo}
                            className="mt-3 px-6 py-3 bg-accent/10 hover:bg-accent hover:text-white border border-accent text-accent rounded-full transition-all duration-300 font-medium tracking-wide"
                        >
                            ✨ A surprise from... Africa ??? ✨
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="text-center z-10 p-4">
                        <div ref={textRef}>
                            <h1 className="text-3xl md:text-5xl font-serif text-text mb-2 leading-tight">
                                Rainy, will you be my valentine?
                            </h1>
                            <p className="text-accent/60 text-sm md:text-base mb-12">
                                (😘)
                            </p>
                        </div>

                        <div className="flex justify-center gap-8 items-center">
                            <button
                                ref={yesBtnRef}
                                onClick={() => setYesAccepted(true)}
                                className="bg-accent text-white px-8 py-3 rounded-theme shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium tracking-wide z-20"
                            >
                                Yes
                            </button>

                            {/* Render "No" button inline only when NOT evading */}
                            {!noBtnPos && (
                                <button
                                    ref={noBtnRef}
                                    className={noBtnClasses}
                                >
                                    {btnText}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Render "No" button absolutely positioned (relative to container) when evading */}
                    {noBtnPos && (
                        <button
                            ref={noBtnRef}
                            style={{
                                position: 'absolute',
                                left: noBtnPos.x,
                                top: noBtnPos.y,
                                transition: 'left 0.15s ease-out, top 0.15s ease-out'
                            }}
                            className={noBtnClasses}
                        >
                            {btnText}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};