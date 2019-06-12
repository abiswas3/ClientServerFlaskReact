import Immutable from 'immutable'
import actions from './actions'

export const State = Immutable.Record({
    'experiment_id': -1,
    'available': true,
    'page_type': "default",
    'chat_history': [],
    'room': 0
})

// store reducer function
export function reducer(state, action) {

    switch (action.type) {
        
    case actions.SELECT_KIND:{
        let payload = action.payload
        console.log("Update page" + action.payload);
        state = state.setIn(['page_type'], action.payload)        
        return state

    }
       
    case actions.UPDATE_STORE:{

        let payload = action.payload
        
        // if("page_type" in payload)
        //     state = state.setIn(['page_type'], payload['page_type'])

        if("experiment_id" in payload)        
            state = state.setIn(['experiment_id'], payload['experiment_id'])
        
        if("chat_history" in payload)
            state = state.setIn(['chat_history'], payload['chat_history'])

        if("available" in payload)
            state = state.setIn(['available'], payload['available'])
        
        if("room" in payload)
            state = state.setIn(['room'], payload['room'])

        return state
    }
        
    default: {
        return state
    }
    }
}
