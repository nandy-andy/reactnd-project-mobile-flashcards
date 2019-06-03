import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { layout } from '../constants/Layout';

export const Deck = ({ title, questions, homeScreen }) => {
    if (homeScreen) {
        return (
            <View style={layout.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.info}>
                    {questions.length === 1
                        ? `${questions.length} Card`
                        : `${questions.length} Cards`
                    }
                </Text>
            </View>
        );
    }

    return (
        <View style={layout.deck}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.info}>
                {questions.length === 1
                    ? `${questions.length} Card`
                    : `${questions.length} Cards`
                }
            </Text>
        </View>
    );
};

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
