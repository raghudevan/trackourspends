import * as CATEGORIES from '@constants/categories';

const expense = [
    { name: 'Household' },
    { name: 'Food & Drinks' },
    { name: 'Transport' },
    { name: 'Utilties' },
    { name: 'Entertainment' },
    { name: 'Family' },
    { name: 'Communication' },
    { name: 'Clothes' },
    { name: 'Health' },
    { name: 'Recreation' },
    { name: 'Travel' },
];

const income = [
    { name: 'Salary' },
    { name: 'Gift' },
];

export default {
    ledger: {},
    categories: { expense, income },
};