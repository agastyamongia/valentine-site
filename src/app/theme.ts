import { useEffect, useState } from 'react';

export type Theme = 'luxe' | 'cute';

const THEME_KEY = 'valentine_theme';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem(THEME_KEY);
        return (saved === 'luxe' || saved === 'cute') ? saved : 'luxe';
    });

    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
        const body = document.body;
        if (theme === 'cute') {
            body.classList.add('theme-cute');
            body.classList.remove('theme-luxe');
        } else {
            body.classList.add('theme-luxe');
            body.classList.remove('theme-cute');
        }
    }, [theme]);

    // To toggle
    const toggleTheme = () => {
        setTheme(prev => prev === 'luxe' ? 'cute' : 'luxe');
    };

    return { theme, toggleTheme };
}
