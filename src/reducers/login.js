import * as login from 'constants/login';

const initialState = {
    user: null,
};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case login.SUCCESS:
        {
            return state;
        }
        case login.FAILED:
        {
            return state;
        }
        default:
        {
            return state;
        }
    }
}
