import * as user from '@constants/user';

import { read, write } from '@utils/async-storage';

export function loadUserData(userObj) {
    return (dispatch) => {
        let dataPromise = read(userObj);
        return dataPromise.then((appState) => {
            return dispatch({
                type: user.LOAD_SUCCESS,
                user: userObj,
                appState,
            });
        });
    };
}

export function saveUserData(userObj, appState) {
    return (dispatch) => {
        return write(userObj, appState).then((isWriteSuccess) => {
            return dispatch({
                type: user.UNLOAD_SUCCESS,
                user: null,
                appState: null,
            });
        });
    };
}