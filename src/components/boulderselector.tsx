import { useState, useContext } from 'preact/hooks';
import { Boulder } from '../boulder.ts';
import { ThemeContext } from '../theme.ts';

const BoulderSelector = () => {
    const [selectedBoulder, setSelectedBoulder] = useState<number>(NaN);
    const { theme } = useContext(ThemeContext);

    const boulders: Boulder[] = [
        { id: 1, label: 'Boulder One' },
        { id: 2, label: 'Boulder Two' },
        { id: 3, label: 'Boulder Three' },
    ];

    const handleSelectChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        setSelectedBoulder(parseInt(target.value, 10));
    };

    const goToBoulder = () => {
        if (selectedBoulder) {
            window.location.href = `/boulder/${selectedBoulder}`;
        } else {
            alert('Please select a Boulder first.');
        }
    };

    const printSelected = () => {
        const boulder = boulders.find(b => b.id === selectedBoulder);
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
                    <option key={boulder.id} value={boulder.id}>
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
