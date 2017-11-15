import * as user from '@constants/user';

import { read, write } from '@utils/async-actions';

export function loadUserData(user) {
    return (dispatch) => {
        return read(user).then(appState => {
            return dispatch({
                type: user.LOAD_SUCCESS,
                user,
                appState
            });
        });
    };
}

//export function saveUserData(data) {
//    return async (dispatch) => {
//
//    }
//}