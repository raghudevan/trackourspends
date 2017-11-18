import * as ledger from '@constants/ledger';

// category should be category id, so that we can map
// back to the category with it => category map should be held somewhere
const initialState = {
    transactions: [
        {
          title: '18 Nov, 2017',
          data: [
              {
                  timestamp: '1',
                  category: 'Meats',
                  description: 'chicken',
                  value: '7',
              },
              {
                  timestamp: '2',
                  category: 'Communication',
                  description: 'mobile recharge',
                  value: '10',
              },
          ]
        },
        {
          title: '17 Nov, 2017',
          data: [
              {
                  timestamp: '3',
                  category: 'Meats',
                  description: 'mutton',
                  value: '10',
              },
              {
                  timestamp: '4',
                  category: 'Transportation',
                  description: 'Booked flight tickets',
                  value: '100',
              },
              {
                    timestamp: '5',
                    category: 'Meats',
                    description: 'mutton',
                    value: '10',
                },
                {
                    timestamp: '6',
                    category: 'Transportation',
                    description: 'Booked flight tickets',
                    value: '100',
                },
          ]
        },
        {
          title: '16 Nov, 2017',
          data: [
              {
                  timestamp: '3',
                  category: 'Meats',
                  description: 'mutton',
                  value: '10',
              },
              {
                  timestamp: '4',
                  category: 'Transportation',
                  description: 'Booked flight tickets',
                  value: '100',
              },
          ]
        },
        {
          title: '15 Nov, 2017',
          data: [
              {
                  timestamp: '3',
                  category: 'Meats',
                  description: 'mutton',
                  value: '10',
              },
              {
                  timestamp: '4',
                  category: 'Transportation',
                  description: 'Booked flight tickets',
                  value: '100',
              },
          ]
        },
    ]
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