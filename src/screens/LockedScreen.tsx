import React, { useState, useRef, useEffect } from 'react';

interface LockedScreenProps {
    onUnlock: () => void;
    onHint: () => void;
    visible: boolean;
}

export const LockedScreen: React.FC<LockedScreenProps> = ({ onUnlock, onHint, visible }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (visible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [visible]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (password.trim().toLowerCase() === 'rainy') {
            onUnlock();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 400); // Duration of shake animation
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleHint = () => {
        onHint();
        if (inputRef.current) inputRef.current.focus();
    };

    if (!visible) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center z-10 p-4 transition-opacity duration-700 ease-in-out">
            <div className={`
        bg-card/90 backdrop-blur-sm p-8 md:p-12 rounded-theme shadow-soft border border-border
        flex flex-col items-center max-w-sm w-full transition-all duration-500
        ${shake ? 'animate-shake' : ''}
      `}>
                <div className="mb-6 text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-accent/80 font-semibold">Protected</span>
                </div>

                <form onSubmit={handleSubmit} className="w-full relative flex items-center">
                    <input
                        ref={inputRef}
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError(false);
                        }}
                        placeholder="••••••"
                        className="input-reset w-full py-2 text-center text-lg tracking-widest text-text placeholder:text-gray-300"
                        aria-label="Password"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 p-2 text-accent hover:text-text transition-colors"
                        aria-label="Submit"
                    >
                        →
                    </button>
                </form>

                <div className="mt-4 h-6 text-center">
                    {error ? (
                        <span className="text-xs text-red-400 font-medium animate-pulse">Try again</span>
                    ) : (
                        <button
                            onClick={handleHint}
                            type="button"
                            className="text-xs text-accent/60 hover:text-accent transition-colors cursor-pointer"
                        >
                            Hint
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
