import * as CATEGORIES from '@constants/categories';

// { type: ['expense', 'income'], name, avatar }
export function createCategory(category) {
    return {
        type: CATEGORIES.CREATE,
        category
    };
}

// contains only the diff
export function updateCategory(category) {
    return {
        type: CATEGORIES.UPDATE,
        category
    };
}