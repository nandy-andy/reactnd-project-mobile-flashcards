import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class NewCardScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Card',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Create new card for "{this.props.deck}" deck</Text>
            </ScrollView>
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
