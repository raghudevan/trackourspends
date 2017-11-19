import * as ledger from '@constants/ledger';

export function createTransaction(transaction) {
    return {
        type: ledger.CREATE,
        transaction
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

