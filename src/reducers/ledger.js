import * as LEDGER from '@constants/ledger';
import * as AUTHENTICATION from '@constants/authentication';
import { getDate, getMonthYear } from '@utils/date-time';
import DEFAULT_APP_STATE from './default-app-state';

/*
{
    "Jan, 2017": [ { title, data: [ { amount, category, description, timestamp, date }, ... ] }, ... ],
    "Feb, 2017": [ ... ],
    ...
}
*/

// { title: data } 

// category should be category id, so that we can map
// back to the category with it => category map should be held somewhere
export default function(state = DEFAULT_APP_STATE['ledger'], action) {
    switch (action.type) {
        case LEDGER.CREATE: {
            let { amount, category, description, timestamp, date } = action.transaction;
            let monthYear = getMonthYear(date);

            let transaction = { amount, category, description, timestamp };
            let dayObj = {
                title: date,
                data: [ transaction ]
            };
            if (!state[monthYear]) {
                // first transaction of the month
                return {
                    ...state,
                    [monthYear]: [ dayObj ]
                };
            } else {
                // nth transaction of the month
                let dayToUpdateIndex = state[monthYear].findIndex(day => getDate(day.title) === getDate(date));

                if (dayToUpdateIndex === -1) {
                    // first transaction of the day
                    return {
                        ...state,
                        [monthYear]: state[monthYear].concat([ dayObj ])
                    };
                } else {
                    // nth transaction of the day
                    let newMonthYearData = state[monthYear].concat([]);
                    let dayToUpdate = newMonthYearData[dayToUpdateIndex];
                    newMonthYearData[dayToUpdateIndex] = {
                        ...dayToUpdate,
                        data: dayToUpdate.data.concat([ transaction ])
                    };
                    return {
                        ...state,
                        [monthYear]: newMonthYearData
                    };
                }
            }
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