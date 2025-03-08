import { createContext } from 'preact';

export interface Boulder {
    uuid: string;
    label: string;
}

// Context
interface BoulderContextType {
    boulder: Boulder;
    toggleTheme: () => void;
}

export const BoulderContext = createContext<BoulderContextType>({
    boulder: { uuid: "", label: "" },
    toggleTheme: () => { },
});
