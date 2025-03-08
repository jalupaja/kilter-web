import { useState, useContext } from 'preact/hooks';
import { Boulder } from '../boulder.ts';
import { ThemeContext } from '../theme.ts';

const STORAGE_KEY = "boulder";

const BoulderSelector = () => {
    const storage_res = localStorage.getItem(STORAGE_KEY);
    let cur_boulder: string = "";

    if (storage_res) {
        cur_boulder = storage_res;
    }

    const [selectedBoulder, setSelectedBoulder] = useState<string>(cur_boulder);
    const { theme } = useContext(ThemeContext);

    const selectBoulder = (next_boulder: string) => {
        setSelectedBoulder(next_boulder);

        localStorage.setItem(STORAGE_KEY, String(next_boulder));
    }

    const boulders: Boulder[] = [
        { uuid: "1", label: 'Boulder One' },
        { uuid: "2", label: 'Boulder Two' },
        { uuid: "3", label: 'Boulder Three' },
    ];

    const handleSelectChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        selectBoulder(target.value);
    };

    const goToBoulder = () => {
        if (selectedBoulder) {
            window.location.href = `/boulder/${selectedBoulder}`;
        } else {
            alert('Please select a Boulder first.');
        }
    };

    const printSelected = () => {
        const boulder = boulders.find(b => b.uuid === selectedBoulder);
        if (boulder) {
            console.log(`Selected boulder: ${boulder.label}`);
        } else {
            console.log('No boulder selected.');
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <select value={selectedBoulder} onChange={handleSelectChange}>
                {boulders.map(boulder => (
                    <option key={boulder.uuid} value={boulder.uuid}>
                        {boulder.label}
                    </option>
                ))}
            </select>
            <button onClick={goToBoulder} style={{ marginLeft: '1rem', backgroundColor: theme.background2, }}>
                Go to Boulder
            </button>
            <button onClick={printSelected} style={{ marginLeft: '1rem', backgroundColor: theme.background2, }}>
                Print Selected
            </button>
        </div>
    );
};

export default BoulderSelector;
