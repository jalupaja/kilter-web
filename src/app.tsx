// import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
// import { requestDevice } from './bluetooth'
import './app.css'

export function App() {
    // const [count, setCount] = useState(333)

    // // copied from bluetooth.js
    // const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
    // const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
    // const MAX_BLUETOOTH_MESSAGE_SIZE = 20;
    // const MESSAGE_BODY_MAX_LENGTH = 255;
    // const PACKET_MIDDLE = 81;
    // const PACKET_FIRST = 82;
    // const PACKET_LAST = 83;
    // const PACKET_ONLY = 84;

    // async function writeCharacteristicSeries(characteristic, messages) {
    //     let returnValue = null;
    //     for (const message of messages) {
    //         returnValue = await characteristic.writeValue(message);
    //     }
    //     return returnValue;
    // }


    // function splitEvery(n, list) {
    //     if (n <= 0) {
    //         throw new Error("First argument to splitEvery must be a positive integer");
    //     }
    //     var result = [];
    //     var idx = 0;
    //     while (idx < list.length) {
    //         result.push(list.slice(idx, (idx += n)));
    //     }
    //     return result;
    // }

    // async function test(num: number): void {
    //     setCount(count + num);

    //     let bluetoothPacket = [1, 37, 21, 2, 84, 227, 0, 28, 20, 1, 28, 69, 0, 31, 145, 0, 31, 63, 0, 31, 157, 0, 31, 208, 0, 31, 55, 1, 227, 27, 1, 244, 239, 0, 244, 33, 0, 244, 49, 1, 244, 3]

    //     let device = await navigator.bluetooth.requestDevice({
    //         optionalServices: [SERVICE_UUID],
    //     });

    //     device.gatt.connect()
    //         .then((server) => {
    //             return server.getPrimaryService(SERVICE_UUID);
    //         })
    //         .then((service) => {
    //             return service.getCharacteristic(CHARACTERISTIC_UUID);
    //         })
    //         .then((characteristic) => {
    //             const splitMessages = (buffer) =>
    //                 splitEvery(MAX_BLUETOOTH_MESSAGE_SIZE, buffer).map(
    //                     (arr) => new Uint8Array(arr)
    //                 );
    //             return writeCharacteristicSeries(
    //                 characteristic,
    //                 splitMessages(bluetoothPacket)
    //             );
    //         })
    //         .then(() => console.log("Climb illuminated"))
    //         .catch((error) => {
    //             if (error.message !== BLUETOOTH_CANCELLED) {
    //                 const message =
    //                     error.message === BLUETOOTH_UNDEFINED
    //                         ? "Web Bluetooth is not supported on this browser. See https://caniuse.com/web-bluetooth for more information."
    //                         : `Failed to connect to LEDS: ${error}`;
    //                 alert(message);
    //             }
    //         });

    //     // console.log()
    // }


    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} class="logo" alt="Vite logo" />
                </a>
                <a href="https://p.com" target="_blank">
                    <img src={preactLogo} class="logo preact" alt="Preact logo" />
                </a>
            </div>
            <h1>Vite + Preact</h1>
            <p>
                Check out{' '}
                <a
                    href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
                    target="_blank"
                >
                    create-preact
                </a>
                , the official Preact + Vite starter
            </p>
            <p class="read-the-docs">
                Click on the Vite and Preact logos to learn more
            </p>
        </>
    )
}
