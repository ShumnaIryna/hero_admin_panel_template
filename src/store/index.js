import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

//------LESSON-202
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};
//------LESSON-202-THE END

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

// const store = createStore( 
//                         combineReducers({heroes, filters}), 
//                         compose(
//                             enhancer,
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                         ));


//------LESSON-202
const store = createStore( 
                    combineReducers({heroes, filters}), 
                    compose(applyMiddleware(ReduxThunk, stringMiddleware),
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
                    );
//------LESSON-202-THE END
export default store;

