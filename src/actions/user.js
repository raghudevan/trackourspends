import * as user from '@constants/user';

import { read, write } from '@utils/async-storage';

export function loadUserData(userObj, callback) {
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