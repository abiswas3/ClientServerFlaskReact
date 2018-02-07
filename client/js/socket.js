import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Immutable from 'immutable' // Just keeping it for flavour might remove this later

import { reducer, Result, State } from './store'
import actions, { select_race} from './actions'

// middleware that snoops in on dispatched actions and sends API requests via
// the socket when appropriate
const socketMiddleware = socket => store => next => action => {

    switch (action.type) {

        // Currently hidden from customer view (built in for experimental purposes)
    case actions.SEARCH_QUERY:{

        socket.emit("search",
                    {"query": action.payload}
                   )
    }
        
    default:
        // Go to the REAL REDUCER
        // Currently hidden from customer view (built in for experimental purpos
        return next(action)
    }
}

function configureStore(socket) {

    // Create store, binding it to outgoing API requests through the middleware
    const store = createStore(reducer,
                              new State(),
                              composeWithDevTools(
                                  applyMiddleware(socketMiddleware(socket))
                              )
                             )

    store.dispatch(select_race(false, 'half_marathon'));
    // Register event handlers for incoming API responses
    socket.on('result', (msg) => {

        console.log(msg);
    })
    return store
}

export default configureStore
