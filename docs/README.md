# TrackOurSpends

### Views

1. Ledger
2. Wallets
3. Notes

### Top Level View

0. Must have google login
1. Once logged in, must land on the ledger
2. Must have a side nav bar to navigate between views

### Ledger

**Purpose**: To store transactions, must be able to quickly switch between
days by swipping left, right

**Functionality**: 
* Ledger must take currency symbol 
* Must be able to CRUD transactions
* All transactions must appear in chronological order
* @transaction: amount, type(expense/income), category, wallet, date, notes
* When a transaction is added/updated/removed, the corresponding wallet is updated

### Wallets

**Purpose**: To keep track of various sources of money

**Functionality**: 
* Must be able to CRUD wallets
* A wallet can hold a certain amount of money
* Can initiate transfers between wallets here (should appear in ledger)
* @wallet_transfer: from, to (wallets), date, notes