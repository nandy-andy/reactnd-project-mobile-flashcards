import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { clearLocalNotification, setLocalNotificationForTomorrow } from '../helpers/notifications';

import { layout } from '../constants/Layout';
import Colors from "../constants/Colors";

class Quiz extends React.Component {
    state = {
        currentQuestion: 0,
        correct: 0,
        incorrect: 0,
        toggleCard: false
    };

    toggle = () => {
        this.setState( (currentState) => {
            return {
                ...currentState,
                toggleCard: !currentState.toggleCard
            }
        });
    };

    correct = () => {
        this.next(true);
    };

    incorrect = () => {
        this.next(false);
    };

    next = (correctGuess) => {
        this.setState( (currentState) => {
            return {
                ...currentState,
                currentQuestion: currentState.currentQuestion + 1,
                correct: correctGuess ? currentState.correct + 1 : currentState.correct,
                incorrect: correctGuess ? currentState.incorrect : currentState.incorrect + 1,
                toggleCard: false
            };
        });
    };

    restart = () => {
        this.setState( () => {
            return {
                currentQuestion: 0,
                correct: 0,
                incorrect: 0,
                toggleCard: false
            };
        });
    };

    renderQuestions() {
        const { questions } = this.props;
        const { currentQuestion, toggleCard } = this.state;
        const questionsCount = questions.length;

        return (
            <View style={layout.container}>
                <Text>{currentQuestion + 1}/{questionsCount}</Text>
                <View style={styles.questionCard}>
                    <Text style={styles.mainText}>{toggleCard ? questions[currentQuestion].answer : questions[currentQuestion].question}</Text>
                    <TouchableOpacity onPress={this.toggle}>
                        <Text style={styles.toggleText}>{toggleCard ? 'Show question' : 'Show answer'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[layout.button, styles.correctButton]} onPress={this.correct}>
                        <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[layout.button, styles.incorrectButton]} onPress={this.incorrect}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderResults() {
        const { deck, questions, deckNavigationName, navigation } = this.props;
        const { correct } = this.state;
        const questionsCount = questions.length;

        return (
            <View style={styles.questionCard}>
                <Text style={styles.textResults}>
                    {correct > 0
                        ? 'Congratulations!'
                        : "No luck this time... Don't give up, try again!"
                    }
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 25}}>
                    <Text style={styles.text}>You answered</Text>
                    <Text style={styles.textNumber}>{correct}</Text>
                    <Text style={styles.text}>out of</Text>
                    <Text style={styles.textNumber}>{questionsCount}</Text>
                    <Text style={styles.text}>correctly!</Text>
                </View>
                <View style={{marginTop: 50}}>
                    <TouchableOpacity style={{marginBottom: 10}} onPress={this.restart}>
                        <Text style={styles.toggleText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(
                            deckNavigationName,
                            {
                                title: deck,
                                questions: questions
                            }
                        )}>
                        <Text style={styles.toggleText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        const { questions } = this.props;
        const { currentQuestion } = this.state;
        const questionsCount = questions.length;

        if (questionsCount === 0) {
            return (
                <View style={styles.container}>
                    <Text>You can't start quiz because there are no questions in the deck.</Text>
                </View>
            );
        }

        if (currentQuestion >= questionsCount) {
            clearLocalNotification()
                .then(setLocalNotificationForTomorrow);

            return this.renderResults();
        }

        return this.renderQuestions();
    }
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: 32
    },
    text: {
        fontSize: 18
    },
    textNumber: {
        fontSize: 24,
        marginLeft: 18,
        marginRight: 18
    },
    textResults: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 50
    },
    toggleText: {
        color: Colors.tabBar
    },
    correctButton: {
        backgroundColor: Colors.greenButton
    },
    incorrectButton: {
        backgroundColor: Colors.redButton
    },
    questionCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Quiz;
