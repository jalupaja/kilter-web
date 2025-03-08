import { useState, useEffect } from 'preact/hooks';
import { ThemeContext, ThemeLight, ThemeDark } from './theme.ts';

const STORAGE_KEY = 'theme';

const ThemeProvider = ({ children }: { children: preact.ComponentChildren }) => {
    const [isDark, setIsDark] = useState(localStorage.getItem(STORAGE_KEY) == "dark");
    const theme = isDark ? ThemeDark : ThemeLight;

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--text', theme.text);
        root.style.setProperty('--header-background', theme.background2);

        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    }, [theme]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{
                minHeight: '100vh',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                padding: '1rem',
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
