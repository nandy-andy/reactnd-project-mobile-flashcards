import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const MOBILE_FLASHCARDS_NOTIFICATION_KEY = 'MobileFlashcards:notifications:v1.00';

function createNotification () {
    return {
        title: 'Log your stats!',
        body: "👋 don't forget to take a quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(MOBILE_FLASHCARDS_NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotificationForTomorrow () {
    AsyncStorage.getItem(MOBILE_FLASHCARDS_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(MOBILE_FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    });
            }
        })
}
