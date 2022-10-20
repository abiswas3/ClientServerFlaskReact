import React from 'react'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import setupStore from './socket'

let loc = 'http://' + window.location.hostname + ':' + window.location.port;
console.log(loc);

const socket = io.connect(loc, {transports: ['websocket']})

const store = setupStore(socket)

// import ReactDOM from 'react-dom';
const root = ReactDOM.createRoot(document.getElementById("root"));
const HelloWorld = () => {
    return (
        <h1>
            Hello World
        </h1>
    );
}

root.render(<HelloWorld/>);
