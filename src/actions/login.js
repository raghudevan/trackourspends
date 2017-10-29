import * as login from 'constants/login';

export function updateUser(user) {
    return {
        type: login.SUCCESS,
        user
    }
}