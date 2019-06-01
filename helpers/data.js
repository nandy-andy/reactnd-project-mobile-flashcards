import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:data:v1.01';

export function getDecks () {
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            return results === null ? {} : results;
        });
}

export function getDeck (title) {
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            return results === null ? {} : results[title];
        });
}

export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        },
    }));
}

export function addCardToDeck(title, card) {
    return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [
                card
            ]
        },
    }));
}
