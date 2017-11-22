import * as ledger from '@constants/ledger';
import * as user from '@constants/user';
import { getDate } from '@utils/date-time';

// category should be category id, so that we can map
// back to the category with it => category map should be held somewhere
const initialState = {
    transactions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ledger.CREATE: {
            let { amount, category, description, timestamp, date } = action.transaction;
            let newTransactions = state.transactions.concat([])
            let dayObj = newTransactions.find(item => getDate(item.title) === getDate(date));
            if (dayObj) {
                dayObj.data = dayObj.data.concat([{ amount, category, description, timestamp }]);
            } else {
                // new transaction for the day
                dayObj = {
                    title: date,
                    data: [{ amount, category, description, timestamp }]
                };
                newTransactions.push(dayObj);
            }

            return { transactions: newTransactions.sort((a, b) => a.title > b.title ? -1 : 1) };
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
        case user.LOAD_SUCCESS: {
            return action.appState.ledger || initialState;
        }
        default: {
            return { ...state };
        }
    }
}