// import { useState } from 'preact/hooks';
// import preactLogo from './assets/preact.svg';
// import viteLogo from '/vite.svg';
import './app.css';
import BoulderSelect from './BoulderSelect.js';
import { useState, } from 'preact/hooks';
import { getBluetoothPacket } from './bluetooth.ts';
import { Boulder, TEST_CLIMBS, TEST_POSITIONS, TEST_COLORS } from './testdata.js';

export function App() {
    // copied from bluetooth.js
    const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
    const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
    const MAX_BLUETOOTH_MESSAGE_SIZE = 20;
    // const MESSAGE_BODY_MAX_LENGTH = 255;
    // const PACKET_MIDDLE = 81;
    // const PACKET_FIRST = 82;
    // const PACKET_LAST = 83;
    // const PACKET_ONLY = 84;

    const BLUETOOTH_UNDEFINED = "navigator.bluetooth is undefined";
    const BLUETOOTH_CANCELLED = "User cancelled the requestDevice() chooser.";

    async function writeCharacteristicSeries(characteristic: BluetoothRemoteGATTCharacteristic, messages: Uint8Array[]) {
        // let returnValue: Promise<void>;
        for (const message of messages) {
            await characteristic.writeValue(message);
        }
        // return returnValue;
    }

    function splitEvery<T>(n: number, list: T[]): T[][] {
        if (n <= 0) {
            throw new Error("First argument to splitEvery must be a positive integer");
        }
        const result: T[][] = [];
        let idx = 0;
        while (idx < list.length) {
            result.push(list.slice(idx, (idx += n)));
        }
        return result;
    }

    async function test(): Promise<void> {
        const bluetoothPacket: number[] = [1, 37, 21, 2, 84, 227, 0, 28, 20, 1, 28, 69, 0, 31, 145, 0, 31, 63, 0, 31, 157, 0, 31, 208, 0, 31, 55, 1, 227, 27, 1, 244, 239, 0, 244, 33, 0, 244, 49, 1, 244, 3];

        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [SERVICE_UUID],
        });

        device.gatt?.connect()
            .then((server) => {
                return server.getPrimaryService(SERVICE_UUID);
            })
            .then((service) => {
                return service.getCharacteristic(CHARACTERISTIC_UUID);
            })
            .then((characteristic) => {
                const splitMessages = (buffer: number[]) =>
                    splitEvery(MAX_BLUETOOTH_MESSAGE_SIZE, buffer).map(
                        (arr) => new Uint8Array(arr)
                    );
                return writeCharacteristicSeries(
                    characteristic,
                    splitMessages(bluetoothPacket)
                );
            })
            .then(() => console.log("Climb illuminated"))
            .catch((error) => {
                if (error.message !== BLUETOOTH_CANCELLED) {
                    const message =
                        error.message === BLUETOOTH_UNDEFINED
                            ? "Web Bluetooth is not supported on this browser. See https://caniuse.com/web-bluetooth for more information."
                            : `Failed to connect to LEDS: ${error}`;
                    alert(message);
                }
            });

    }

    const [selectedBoulder, setSelectedBoulder] = useState<Boulder | null>(null);

    const handleChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        const selectedBoulder = TEST_CLIMBS.find(item => item.name === target.value) || null;
        setSelectedBoulder(selectedBoulder);
    };

    async function transmitBoulder() {
        const bluetoothPacket = getBluetoothPacket(selectedBoulder?.frames || '', TEST_POSITIONS, TEST_COLORS);

        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [SERVICE_UUID],
        });

        device.gatt?.connect()
            .then((server) => {
                return server.getPrimaryService(SERVICE_UUID);
            })
            .then((service) => {
                return service.getCharacteristic(CHARACTERISTIC_UUID);
            })
            .then((characteristic) => {
                const splitMessages = (buffer: Uint8Array) =>
                    splitEvery(MAX_BLUETOOTH_MESSAGE_SIZE, Array.from(buffer)).map(
                        (arr) => new Uint8Array(arr)
                    );
                return writeCharacteristicSeries(
                    characteristic,
                    splitMessages(bluetoothPacket)
                );
            })
            .then(() => console.log("Climb illuminated"))
            .catch((error) => {
                if (error.message !== BLUETOOTH_CANCELLED) {
                    const message =
                        error.message === BLUETOOTH_UNDEFINED
                            ? "Web Bluetooth is not supported on this browser. See https://caniuse.com/web-bluetooth for more information."
                            : `Failed to connect to LEDS: ${error}`;
                    alert(message);
                }
            });
    }

    return (
        <>
            <h1>Magic Kilterboard Button</h1>
            <BoulderSelect selectedBoulder={selectedBoulder} onChange={handleChange} />
            <button onClick={transmitBoulder}>
                    Click here
            </button>

            <button onClick={test}>
                    backup
            </button>
        </>
    );
}