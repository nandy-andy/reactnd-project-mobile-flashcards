const dummyDecks = {
    Deck1: {
        title: 'Deck1',
        questions: [{
            question: 'What is Fandom?',
            answer: 'Awesome company and perfect entertainment platform for fans by fans!'
        }, {
            question: 'What is jQuery?',
            answer: 'Old school JS lib: less is more ;-)'
        }]
    },
    Deck2: {
        title: 'Deck2',
        questions: []
    },
};

export function getDecks() {
    return dummyDecks;
}

export function getDeck(id) {
    return dummyDecks[id];
}

export function saveDeckTitle(title) {
    console.log('Saving "' + title + '"...');
}

export function addCardToDeck(title, card) {
    console.log('Adding "' + card.question + '" to "' + card.title + '"...');
}
