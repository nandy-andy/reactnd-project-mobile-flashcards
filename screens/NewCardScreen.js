import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { addCardToDeck } from '../helpers/data';

export default class NewCardScreen extends React.Component {
    static navigationOptions = {
        title: 'Add new card',
    };

    state = {
        question: '',
        answer: '',
        error: ''
    };

    handleQuestionChange = (question) => {
        this.setState((currentState) => {
            return {
                question,
                answer: currentState.answer,
                error: ''
            }
        });
    };

    handleAnswerChange = (answer) => {
        this.setState((currentState) => {
            return {
                question: currentState.question,
                answer,
                error: ''
            }
        });
    };

    submit = () => {
        const { question, answer } = this.state;

        if (question === '' || answer === '') {
            this.setState((currentState) => {
                return {
                    question: currentState.question,
                    answer: currentState.answer,
                    error: 'Please, fill all fields before submitting'
                }
            });
        } else {
            const deckTitle = this.props.navigation.state.params.deck;
            const { question, answer } = this.state;
            addCardToDeck(deckTitle, {question, answer});
            this.props.navigation.navigate('Home');
        }
    };

    render() {
        const { question, answer, error } = this.state;
        const deckTitle = this.props.navigation.state.params.deck;

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text>Create new card for "{deckTitle}" deck</Text>
                {error !== '' && <Text>{error}</Text>}
                <Text>Question:</Text>
                <TextInput
                    value={question}
                    onChangeText={this.handleQuestionChange}
                />
                <Text>Answer:</Text>
                <TextInput
                    value={answer}
                    onChangeText={this.handleAnswerChange}
                />
                <TouchableOpacity onPress={this.submit}><Text>Create new card</Text></TouchableOpacity>
            </KeyboardAvoidingView>
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
