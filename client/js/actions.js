// action types
const actions = {}
export default actions

actions.UPDATE_STORE =  'UPDATE_STORE'
actions.UPDATE_CHAT =  'UPDATE_CHAT'
actions.UPDATE_PAGE =  'UPDATE_PAGE'
actions.SELECT_KIND = 'SELECT_KIND'

export function select_kind(page_type){
    return {
        type: actions.SELECT_KIND,
        payload: page_type
    }
}

export function chat(value){
    return {
        type: actions.CHAT,
        payload: value
    }
}

export function update_chat(server_payload){

    return {
        type: actions.UPDATE_CHAT,
        payload: server_payload
    }
}

export function update_page(page_type){

    console.log("Actions: " + page_type);
    console.log(actions.UPDATE_PAGE);
    
    return {
        type: actions.UPDATE_PAGE,
        payload: page_type
    }
}

export function update_store(server_payload){
    
    return {
        type: actions.UPDATE_STORE,
        payload: server_payload
    }
}


