
// action types
const actions = {}
export default actions
actions.UPDATE_STORE =  'UPDATE_STORE'
actions.BINARY_FEEDBACK = 'BINARY_FEEDBACK'

export function binary_feedback(choice){
    return {
        type: actions.BINARY_FEEDBACK,
	// 0 left 1 right 2 neither
        payload: {'clicked': choice}
    }
}

export function update_store(server_payload){    
    return {
        type: actions.UPDATE_STORE,
        payload: server_payload
    }
}


