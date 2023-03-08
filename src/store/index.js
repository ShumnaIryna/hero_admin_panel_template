import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';
//import ReduxThunk from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import { configureStore } from '@reduxjs/toolkit';

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
// const store = createStore( 
//                     combineReducers({heroes, filters}), 
//                     compose(applyMiddleware(ReduxThunk, stringMiddleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                     );
//------LESSON-202-THE END

//------LESSON-204
const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    
});

//------LESSON-204-THE END
export default store;

