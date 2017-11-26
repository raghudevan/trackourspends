import PushNotifications from 'react-native-push-notifications';

// https://github.com/zo0r/react-native-push-notification#local-notifications
export function configureNotifications() {
    PushNotifications.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },
        // (required) Called when a remote or local notification is opened or received
        onNotification: (notification) => {
            console.log( 'NOTIFICATION:', notification );
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
}