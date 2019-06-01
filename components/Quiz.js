import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Quiz extends React.Component {
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

    render() {
        const { deck, questions } = this.props;
        const { currentQuestion, toggleCard } = this.state;
        const questionsCount = questions.length;

        if (questionsCount === 0) {
            return (
                <View style={styles.container}>
                    <Text>You can't start quiz because there are no questions in the deck.</Text>
                </View>
            );
        }

        if (currentQuestion >= questionsCount) {
            return (
                <View style={styles.container}>
                    <Text>{this.state.correct > 0 ? 'Congratulations!' : 'No luck this time...'}</Text>
                    <Text>You answered {this.state.correct} out of {questionsCount} correctly!</Text>
                    <TouchableOpacity onPress={this.restart}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            'Deck',
                            {
                                title: deck,
                                questions: questions
                            }
                    )}>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text>{currentQuestion + 1}/{questionsCount}</Text>
                <Text>{toggleCard ? questions[currentQuestion].answer : questions[currentQuestion].question}</Text>
                <TouchableOpacity onPress={this.toggle}>
                    <Text>{toggleCard ? 'Show question' : 'Show answer'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.correct}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.incorrect}>
                    <Text>Incorrect</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
