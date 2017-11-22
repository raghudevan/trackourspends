import { AsyncStorage } from 'react-native';

function makeAppStateForSave(appState) {
    // can determine here what we want to save as app state for the user
    return appState;
}

export async function read(userObj) {
    let appState;
    try {
        // https://github.com/facebook/react-native/issues/14101#issuecomment-346196392
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

