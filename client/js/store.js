import Immutable from 'immutable'
import actions from './actions'

export const State = Immutable.Record({
    'liked': [],
    'disliked': [],
    'items': []
})

// store reducer function
export function reducer(state, action) {

    switch (action.type) {

    case actions.UPDATE_STORE:{

        let payload = action.payload
 	
        state = state.setIn(['liked'], payload['all_likes'])
        state = state.setIn(['disliked'], payload['all_dislikes'])
        state = state.setIn(['items'], payload['items'])

        return state

    }
    default: {
        return state
    }
    }
}
