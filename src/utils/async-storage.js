import { AsyncStorage } from 'react-native';

function makeAppStateForSave(appState) {
    // can determine here what we want to save as app state for the user
    return {};
}

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

    return appState;
}

export async function write(userObj, appState) {
    let isWriteSuccess = false;
    let appStateForSave = makeAppStateForSave(appState);
    try {
        await AsyncStorage.setItem(userObj.email, JSON.stringify(appStateForSave));
        isWriteSuccess = true;
    } catch (exception) {
        console.log('unable to write to async storage');
    }
    return isWriteSuccess;
}

