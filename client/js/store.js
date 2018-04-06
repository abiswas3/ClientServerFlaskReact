import Immutable from 'immutable'
import actions from './actions'

export const State = Immutable.Record({
    'left': [],
    'right': [],
    'history':[],
    'ranks': []
})

// store reducer function
export function reducer(state, action) {

    switch (action.type) {

    case actions.UPDATE_STORE:{

        let payload = action.payload
 	console.log(payload);
        state = state.setIn(['left'], payload['left'])
        state = state.setIn(['right'], payload['right'])
        state = state.setIn(['ranks'], payload['ranks'])
        state = state.setIn(['history'], payload['history'])
	
        return state

    }
    default: {
        return state
    }
    }
}
