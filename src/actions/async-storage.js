import { AsyncStorage } from 'react-native';

import * as constants from 'constants/async-storage';

function read(userid) {
    return async (dispatch) => {
        let type;
        let data;

        try {
            data = await AsyncStorage.getItem(userid).then(data => JSON.parse(data));
            data = data || { ledger: [], wallets: [] }; // this is the default struct of 'appState'
            type = constants.READ_SUCCESS;
        } catch (exception) {
            type = constants.READ_FAILED;
        }

        dispatch({ type, data });
    };
}

function write(userid, data) {
    return async (dispatch) => {
        await AsyncStorage.setItem(userid, JSON.stringify(data));
        dispatch({
            type: constants.WRITE_SUCCESS,
        });
    };
}

export { read, write };