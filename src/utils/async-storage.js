import { AsyncStorage } from 'react-native';

import DEFAULT_APP_STATE from '@reducers/default-app-state';

function makeAppStateForSave(appState) {
    // can determine here what we want to save
    // and how(what struct) we want to save it in
    return JSON.stringify(appState);
}

export async function read(userObj) {
    let appState;
    let error;
    // https://github.com/facebook/react-native/issues/14101#issuecomment-346196392
    appState = await AsyncStorage.getItem(userObj.email);
    return appState ? JSON.parse(appState) : DEFAULT_APP_STATE;;
}

export async function write(userObj, appState) {
    if (appState) {
        let appStateForSave = makeAppStateForSave(appState);
        await AsyncStorage.setItem(userObj.email, appStateForSave);
    } else {
        await AsyncStorage.removeItem(userObj.email);
    }
    return true;
}

