import { AsyncStorage } from 'react-native';

export function async read(userid) {
    let data;
    try {
        data = await AsyncStorage.getItem(userid).then(data => JSON.parse(data));
        data = data || { ledger: [], wallets: [] };
    } catch (exception) {
        // log the exception?
    }
    return data;
}

export function async write(userid, data) {
    let isWriteSuccess = false;
    try {
        await AsyncStorage.setItem(userid, JSON.stringify(data));
        isWriteSuccess = true;
    } catch (exception) {
        // log the exception?
    }
    return isWriteSuccess;
}

