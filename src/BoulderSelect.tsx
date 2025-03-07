import { Boulder, TEST_CLIMBS } from './testdata.js';

interface BoulderSelectProps {
    selectedBoulder: Boulder | null;
    onChange: (event: Event) => void;
}

const BoulderSelect = ({ selectedBoulder, onChange }: BoulderSelectProps) => {
    return (
        <div>
            <select value={selectedBoulder ? selectedBoulder.name : ''} onChange={onChange}>
                <option value="" disabled>Select a Boulder</option>
                {TEST_CLIMBS.map(item => (
                    <option key={item.name} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};


export default BoulderSelect;