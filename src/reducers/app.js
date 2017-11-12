import * as login from 'constants/login';
import * as asyncStorage from 'constants/async-storage';

const initialState = {
    user: null,
    appState: null,
    ledger: null,
    wallets: null, // better to keep as a single appState object or split up?
    // think its better to split into separate reducers!
};

export default function appReducer(state = initialState, action) {
    switch(action.type) {
        case login.SUCCESS:
        {
            return { ...state, user: action.user };
        }
        case login.FAILED:
        {
            return state;
        }
        case asyncStorage.READ_SUCCESS:
        {
            return { ...state, appState: action.data };
        }
        default:
        {
            return state;
        }
    }
}
