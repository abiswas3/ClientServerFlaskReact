import Immutable from 'immutable'
import actions from './actions'

export const State = Immutable.Record({
    'liked': [],
    'disliked': [],
    'items': [],
    'old_ranking': [],
    'chat_history': []
})

// store reducer function
export function reducer(state, action) {

    switch (action.type) {

    case actions.UPDATE_STORE:{

        
 	    let payload = action.payload
        let keys = ["liked",
                    "disliked",
                    "items",
                    "old_ranking",
                    "chat_history"];

        keys.forEach(function (key, index) {
            if(key in payload)
                state = state.setIn([key], payload[key])
            
        });

        return state

    }
    default: {
        return state
    }
    }
}
