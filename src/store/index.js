import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //'remote-redux-devtools';
import thunk from 'redux-thunk';


import * as reducers from 'reducers';

const initialState = {};
const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);

const createMyStore = () =>
    createStore(
        reducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );

export default createMyStore;