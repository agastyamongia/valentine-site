import React from 'react';
import type { Theme } from '../app/theme';

interface StyleToggleProps {
    theme: Theme;
    onToggle: () => void;
}

export const StyleToggle: React.FC<StyleToggleProps> = ({ theme, onToggle }) => {
    return (
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft border border-border transition-all duration-300">
            <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'luxe' ? 'text-text' : 'text-gray-400'}`}>Luxe</span>

            <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full flex items-center p-1 duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 ${theme === 'luxe' ? 'bg-gray-200' : 'bg-pink-200'}`}
                aria-label="Toggle theme"
            >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${theme === 'luxe' ? 'translate-x-0' : 'translate-x-6'}`}></div>
            </button>

            <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'cute' ? 'text-pink-500' : 'text-gray-400'}`}>Cute</span>
        </div>
    );
};
