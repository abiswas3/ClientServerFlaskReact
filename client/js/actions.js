
// action types
const actions = {}
export default actions
actions.SEARCH_QUERY = 'SEARCH_QUERY'
actions.SELECT_RACE = 'SELECT_RACE'

export function search(query){

    return {
        type: actions.SEARCH_QUERY,
        payload: {'query': query}
    }
}

export function select_race(selected, key){

    return {
        type: actions.SELECT_RACE,
        payload: {'selected': selected, 'key': key}
    }
}


