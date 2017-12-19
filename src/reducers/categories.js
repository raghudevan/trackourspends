import * as CATEGORIES from '@constants/categories';
import DEFAULT_APP_STATE from './default-app-state';

export default function (state = DEFAULT_APP_STATE['categories'], action) {
    switch (action.type) {
        case CATEGORIES.CREATE: {
            const { type, name, avatar } = action.category;
            return {
                ...state,
                [type]: state[type].concat([{ name, avatar }])
            };
        }
        case CATEGORIES.UPDATE: {
            return state;
        }
        default: {
            return state;
        }
    }
}