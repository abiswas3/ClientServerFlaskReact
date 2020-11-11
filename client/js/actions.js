
// action types
const actions = {}
export default actions
actions.UPDATE_STORE =  'UPDATE_STORE'
actions.BINARY_FEEDBACK = 'BINARY_FEEDBACK'
actions.HOVER = 'HOVER'

export function hover(rowIndex, colIndex, inOrOut){
    return {
        type: actions.HOVER,
        payload: {'rowIndex': rowIndex, 'colIndex': colIndex, 'inOrOut': inOrOut}
    }
}

export function binary_feedback(nature, id){
    return {
        type: actions.BINARY_FEEDBACK,
        payload: {'type': nature, 'id': id}
    }
}

export function update_store(server_payload){
    
    return {
        type: actions.UPDATE_STORE,
        payload: server_payload
    }
}


