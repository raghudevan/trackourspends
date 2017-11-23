import * as LEDGER from '@constants/ledger';
import * as AUTHENTICATION from '@constants/authentication';
import { getDate } from '@utils/date-time';
import DEFAULT_APP_STATE from './default-app-state';

// category should be category id, so that we can map
// back to the category with it => category map should be held somewhere
export default function(state = DEFAULT_APP_STATE['ledger'], action) {
    switch (action.type) {
        case LEDGER.CREATE: {
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
        case LEDGER.UPDATE: {
            let transaction = state.transactions.find((item) => item.id === action.data.id);
            transaction = { ...transaction, ...action.data };
            return transactions.concat([]);
        }
        case LEDGER.DELETE: {
            let transactions = state.transactions.filter((item) => item.id !== action.data.id);
            return { transactions };
        }
        case AUTHENTICATION.SIGN_IN_SUCCESS: {
            return action.appState && action.appState.ledger;
        }
        default: {
            return { ...state };
        }
    }
}