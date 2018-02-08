
// action types
const actions = {}
export default actions
actions.UPDATE_STORE =  'UPDATE_STORE'
actions.BINARY_FEEDBACK = 'BINARY_FEEDBACK'

export function binary_feedback(nature, id){
    return {
        type: actions.BINARY_FEEDBACK,
	//+1 or -1 for like and dislike
        payload: {'type': nature, 'id': id}
    }
}

export function update_store(server_payload){
    
    return {
        type: actions.UPDATE_STORE,
        payload: server_payload
    }
}


