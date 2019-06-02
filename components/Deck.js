import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { layout } from '../constants/Layout';

class Deck extends React.Component {
    render() {
        const { title, questions, homeScreen } = this.props;

        if (homeScreen) {
            return (
                <View style={layout.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.info}>Contains {questions.length} cards</Text>
                </View>
            );
        }

        return (
            <View style={layout.deck}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.info}>Contains {questions.length} cards</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        fontSize: 18
    },
    info: {
        flex: 1,
        padding: 5,
        alignItems: 'flex-start'
    }
});

export default Deck;
