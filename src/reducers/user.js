import * as user from '@constants/user';

const initialState = {
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case user.LOAD_SUCCESS: {
            return { ...state, user: action.user };
        }
        case login.FAILED: {
            return state;
        }
        default: {
            return state;
        }
    }
}
