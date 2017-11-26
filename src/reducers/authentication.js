import * as AUTHENTICATION from '@constants/authentication';

const initialState = null

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATION.SIGN_IN_SUCCESS: {
            return { user: action.user };
        }
        case AUTHENTICATION.SIGN_OUT_SUCCESS: {
            return { user: action.user };
        }
        default: {
            return state;
        }
    }
}
