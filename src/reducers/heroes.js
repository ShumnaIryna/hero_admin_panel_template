const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}
// heroesLoadingStatus: 'idle'----state when nothing happens
const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

//---HERO_CREATED
        case 'HERO_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }

//---HERO_DELETED----            
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }
        default: return state
    }
}

export default heroes;