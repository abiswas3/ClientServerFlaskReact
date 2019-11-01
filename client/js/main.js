import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import App from './components/App'
import configureStore from './socket'

let loc = 'http://' + window.location.hostname + ':' + window.location.port;
console.log(loc);

const socket = io.connect(loc, {transports: ['websocket']})
console.log("CONNECTING TO SOCKET");

const store = configureStore(socket)

ReactDOM.render(
        <Provider store={store}>
        <App/>
        </Provider>,
    document.getElementById('main')
)
    

