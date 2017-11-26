import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import screenTracking from './screen-tracking';

import * as reducers from '@reducers';

const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);
const makeAppReducer = (dynamicReducers) => combineReducers({ ...reducers, ...dynamicReducers });

const createMyStore = (dynamicReducers = {}) => {
    let store = createStore(
        makeAppReducer(dynamicReducers),
        composeWithDevTools(
            applyMiddleware(thunk, screenTracking),
        ),
    );

    return store;
}

export default createMyStore;