import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import * as reducers from '@reducers';

const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);
const makeAppReducer = (dynamicReducers) => combineReducers({ ...reducers, ...dynamicReducers });

const createMyStore = (dynamicReducers = {}) =>
    createStore(
        makeAppReducer(dynamicReducers),
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );

export default createMyStore;