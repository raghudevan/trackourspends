/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { DrawerNavigator } from 'react-navigation';

import Ledger from 'views/Ledger';
import Wallets from 'views/Wallets';

const App = DrawerNavigator({
    Ledger: {
        screen: Ledger
    },
    Wallets: {
        screen: Wallets
    },
});

export default App;
