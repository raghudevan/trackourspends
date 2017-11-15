import { AsyncStorage } from 'react-native';

export async function read(userObj) {
    let appState;
    try {
        appState = await AsyncStorage.getItem(userObj.email);
        if (appState) {
            appState = JSON.parse(appState);
        }
    } catch (exception) {
        console.log('unable to read from async storage');
    }

    return appState || { ledger: [], wallets: [] };
}

//export function write(userObj, data) {
//    let isWriteSuccess = false;
//    try {
//        await AsyncStorage.setItem(userObj.email, JSON.stringify(data));
//        isWriteSuccess = true;
//    } catch (exception) {
//        // log the exception?
//    }
//    return isWriteSuccess;
//}

