import * as ledger from '@constants/ledger';

const initialState = {
    transactions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ledger.CREATE: {
            let transactions = state.transactions.concat([action.data]);
            return { transactions };
        }
        case ledger.UPDATE: {
            let transaction = state.transactions.find((item) => item.id === action.data.id);
            transaction = { ...transaction, ...action.data };
            return transactions.concat([]);
        }
        case ledger.DELETE: {
            let transactions = state.transactions.filter((item) => item.id !== action.data.id);
            return { transactions };
        }
        default: {
            return { ...state };
        }
    }
}