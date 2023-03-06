const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}
// heroesLoadingStatus: 'idle'----state when nothing happens
const reducer = (state = initialState, action) => {
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

                filteredHeroes: state.activeFilter === 'all' ? 
                action.payload : 
                action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
//---FILTERS
case 'FILTERS_FETCHING':
    return {
        ...state,
        filtersLoadingStatus: 'loading'
    }
case 'FILTERS_FETCHED':
    return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle'
    }
case 'FILTERS_FETCHING_ERROR':
    return {
        ...state,
        filtersLoadingStatus: 'error'
    }

//ACTIVE_FILTER
case 'ACTIVE_FILTER_CHANGED':
    return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes: action.payload === 'all' ? 
                        state.heroes :
                        state.heroes.filter(item => item.element === action.payload)
    }

//---HERO_CREATED
        case 'HERO_CREATED':
            //Forming a new array
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList,
                // Filter new data by the filter currently applied
                filteredHeroes: state.activeFilter === 'all' ? 
                                newCreatedHeroList : 
                                newCreatedHeroList.filter(item => item.element === state.activeFilter)
            }

//---HERO_DELETED----            
        case 'HERO_DELETED':
            //Forming a new array
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                //Filtering new data by the filter that is currently applied
                filteredHeroes: state.activeFilter === 'all' ? 
                                newHeroList : 
                                newHeroList.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;