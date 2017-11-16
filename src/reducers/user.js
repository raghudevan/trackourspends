import * as user from '@constants/user';

const initialState = null

export default function (state = initialState, action) {
    switch (action.type) {
        case user.LOAD_SUCCESS: {
            return action.user;
        }
        case user.UNLOAD_SUCCESS: {
            return action.user;
        }
        default: {
            return state;
        }
    }
}
