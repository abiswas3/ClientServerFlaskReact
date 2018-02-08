import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Immutable from 'immutable' // Just keeping it for flavour might remove this later

import { reducer, State } from './store'
import actions, {select_race, update_store} from './actions'

// middleware that snoops in on dispatched actions and sends API requests via
// the socket when appropriate
const socketMiddleware = socket => store => next => action => {

    switch (action.type) {

    case actions.BINARY_FEEDBACK:{

	let state = store.getState();

        socket.emit("bin_feedback",
                    {"all_likes": state.liked,
		     "all_dislikes": state.disliked,
		     "current_item": action.payload.id,
		     "label": action.payload.type,
		     "items": state.items
		    }
                   )

    }

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

    // Register event handlers for incoming API responses
    socket.on('result', (msg) => {

	if(msg['items'].length > 0)
	    store.dispatch(update_store(msg))	

    })
    return store
}

export default configureStore
