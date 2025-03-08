import { createContext } from 'preact';

export interface Boulder {
    id: number;
    label: string;
}

// Context
interface BoulderContextType {
    boulder: Boulder;
    toggleTheme: () => void;
}

export const BoulderContext = createContext<BoulderContextType>({
    boulder: { id: NaN, label: "" },
    toggleTheme: () => { },
});
