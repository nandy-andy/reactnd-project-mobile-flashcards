import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class NewDeckScreen extends React.Component {
  static navigationOptions = {
    title: 'NewDeck',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Create new deck</Text>
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
