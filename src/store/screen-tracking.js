import { NavigationActions } from 'react-navigation';
import { Alert } from '@components/Notifier';

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

// this middleware will remove all notifications when we we move from
// one screen to another
const screenTracking = ({ getState }) => next => action => {
    if (action.type !== NavigationActions.NAVIGATE &&
        action.type !== NavigationActions.BACK) {
        return next(action);
    }

    const currentScreen = getCurrentRouteName(getState().nav);
    const result = next(action);
    const nextScreen = getCurrentRouteName(getState().nav);
    if (nextScreen !== currentScreen) {
        Alert.isVisible() && Alert.hide();
    }
    return result;
}

export default screenTracking;