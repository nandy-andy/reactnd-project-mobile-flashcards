import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:data:v1.02';

export function getDecks () {
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            return results === null ? {} : results;
        });
}

export function getDeck (title) {
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            if (results === null) {
                return {};
            }

            results = JSON.parse(results);
            return results[title];
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
    return getDeck(title)
        .then((deck) => {
            return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    title,
                    questions: [
                        ...deck['questions'],
                        card
                    ]
                },
            }));
        });
}
