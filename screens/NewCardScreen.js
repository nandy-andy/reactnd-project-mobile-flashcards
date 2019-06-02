import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import { addCardToDeck } from '../helpers/data';
import { addCard } from '../actions';

class NewCardScreen extends React.Component {
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
        const { deckTitle, dispatch } = this.props;

        if (question === '' || answer === '') {
            this.setState((currentState) => {
                return {
                    question: currentState.question,
                    answer: currentState.answer,
                    error: 'Please, fill all fields before submitting'
                }
            });
        } else {
            const { question, answer } = this.state;
            const card = { question, answer };

            dispatch(addCard(deckTitle, card));
            addCardToDeck(deckTitle, card);
            this.props.navigation.navigate('Home');
        }
    };

    render() {
        const { question, answer, error } = this.state;
        const { deckTitle } = this.props;

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


function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params;

    return {
        deckTitle: state[title].title
    }
}

export default connect(
    mapStateToProps,
)(NewCardScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
