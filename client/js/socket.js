import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Immutable from 'immutable' // Just keeping it for flavour might remove this later

import { reducer, State } from './store'
import actions, {update_store, update_chat} from './actions'

// middleware that snoops in on dispatched actions and sends API requests via
// the socket when appropriate
const socketMiddleware = socket => store => next => action => {

    switch (action.type) {

    case actions.UPDATE_CHAT:{

        console.log("Sending stuff client");
	    let state = store.getState();

        socket.emit("chat",
                    {"experiment_id": state.experiment_id,
                     "type": state.page_type,
                     "chat_history": state.chat_history,
                     "message": action.payload,
                     "room":state.room
		            }
                   )
        return next(action)

    }


    case actions.SELECT_KIND:{
        let state = store.getState();
        socket.emit("initial_choice",
                    {"type": action.payload}
                   )
        
        return next(action)
    }

        
    default:
        console.log("sockets" + action.type);
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


    // Register event handlers for incoming API responses
    socket.on('setup', (msg) => {
	    store.dispatch(update_store(msg));
    })
    // Register event handlers for incoming API responses
    socket.on('server_chat', (msg) => {
	    store.dispatch(update_store(msg));
    })

    // message handler for the 'join_room' channel
    socket.on('join_room', function(msg) {
        console.log(msg);
    });
    
    return store
}

export default configureStore
