import Immutable from 'immutable'
import actions from './actions'

export const State = Immutable.Record({
    'half_marathon': false
})

// store reducer function
export function reducer(state, action) {

    switch (action.type) {
        
   // Currently hidden from customer view (built in for experimental purposes)
    case actions.SELECT_RACE:{
        
        let selected = action.payload['selected']
        let key = action.payload['key']
        
        // console.log(selected, key);        
        state = state.setIn([key], selected)
        
        return state
    }

    default: {
        return state
    }
    }
}
