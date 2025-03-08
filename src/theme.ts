import { createContext } from 'preact';

export interface Theme {
    background: string;
    text: string;
    background2: string;
}

export const ThemeLight: Theme = {
    background: '#ffffff',
    text: '#000000',
    background2: '#f0f0f0',
};

export const ThemeDark: Theme = {
    background: '#1e1e1e',
    text: '#ffffff',
    background2: '#333333',
};

// Context
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: ThemeLight,
    toggleTheme: () => { },
});
