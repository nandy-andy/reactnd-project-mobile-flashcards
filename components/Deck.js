import React from 'react';
import { Text, View } from 'react-native';

class Deck extends React.Component {
    render() {
        const { title, questions } = this.props;

        return (
            <View>
                <Text>{title}</Text>
                <Text>Contains {questions.length} cards</Text>
            </View>
        );
    }
}

export default Deck;
