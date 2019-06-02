import React from 'react';
import {
    KeyboardAvoidingView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import { addCardToDeck } from '../helpers/data';
import { addCard } from '../actions';

import { layout } from '../constants/Layout';
import Colors from '../constants/Colors';

class NewCardScreen extends React.Component {
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
            <View style={layout.container}>
                <Text style={layout.header}>Add new card</Text>
                <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Create new card for "{deckTitle}" deck:</Text>
                    {error !== '' && <Text>{error}</Text>}
                    <TextInput
                        value={question}
                        onChangeText={this.handleQuestionChange}
                        placeholder={'Type here the question...'}
                        style={layout.input}
                    />
                    <TextInput
                        value={answer}
                        onChangeText={this.handleAnswerChange}
                        placeholder={'Type here the answer...'}
                        style={layout.input}
                    />
                    <TouchableOpacity style={[layout.button, {backgroundColor: Colors.greenButton}]} onPress={this.submit}>
                        <Text>Create new card</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params;

    return {
        deckTitle: title
    }
}

export default connect(
    mapStateToProps,
)(NewCardScreen);
