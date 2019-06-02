import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'

import Quiz from '../components/Quiz';

import { layout } from "../constants/Layout";

class StartQuizScreen extends React.Component {
    render() {
        const { deck, questions } = this.props;

        return (
            <View style={layout.container}>
                <Text style={layout.header}>Quiz: {deck}!</Text>
                <Quiz deck={deck} questions={questions} deckNavigationName={'Deck'} navigation={this.props.navigation} />
            </View>
        );
    }
}

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params;

    return {
        deck: title,
        questions: state[title].questions
    }
}

export default connect(
    mapStateToProps,
)(StartQuizScreen);
