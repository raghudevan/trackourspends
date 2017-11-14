import * as ledger from 'constants/ledger';

export function createTransaction() {
    return {
        type: ledger.CREATE,
    };
}

export function updateTransaction() {
    return {
        type: ledger.UPDATE,
    };
}

export function deleteTransaction() {
    return {
        type: ledger.DELETE,
    };
}

