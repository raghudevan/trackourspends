import { configureGoogleSignin, googleSignin, googleSignout } from '@utils/google-signin';
import { read, write } from '@utils/async-storage';
import { Alert } from '@alert';

import * as AUTHENTICATION from '@constants/authentication';
import * as NOTIFICATION from '@constants/notification';

// will check if the user is already logged in; typically done on app init
export function init() {
    return async (dispatch) => {
        try {
            const user = await configureGoogleSignin(); // can parameterize type of login
            if (user) {
                const appState = await read(user);
                // dispatch LOAD_USER_DATA; with user, appState
                dispatch({
                    type: AUTHENTICATION.SIGN_IN_SUCCESS,
                    user,
                    appState,
                });
                return true;
            }
        } catch (exception) {
            // UNABLE_TO_INIT; dispatch NOTIFICATION_ERROR with error message
            Alert.error(exception.message);
        }
    };
}

// will do login
export function login() {
    return async (dispatch) => {
        try {
            const user = await googleSignin(); // can parameterize type of login
            const appState = await read(user);
            // dispatch LOAD_USER_DATA; with user, appState
            dispatch({
                type: AUTHENTICATION.SIGN_IN_SUCCESS,
                user,
                appState,
            });
            return true;
        } catch (exception) {
            // cant signin -> raise error
            // LOGIN_FAILED; dispatch NOTIFICATION_ERROR with error message
            Alert.error(exception.message);
        }
    };
}

export function logout(user, appState) {
    return async (dispatch) => {
        try {
            await googleSignout();
            await write(user, appState);
            dispatch({
                type: AUTHENTICATION.SIGN_OUT_SUCCESS,
                user: null,
                appState: null,
            });
        } catch (exception) {
            Alert.error(exception.message);
        }
    };
}