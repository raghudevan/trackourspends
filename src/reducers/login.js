import * as login from 'constants/login';
import * as asyncStorage from 'constants/async-storage';

const initialState = {
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case login.SUCCESS: {
            return { ...state, user: action.user };
        }
        case login.FAILED: {
            return state;
        }
        case asyncStorage.READ_SUCCESS: {
            return { ...state, appState: action.data };
        }
        default: {
            return state;
        }
    }
}
