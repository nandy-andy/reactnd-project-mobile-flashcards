import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Deck from '../components/Deck';

export default class DeckScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
      const { title } = navigation.state.params;

      return {
          title
      }
  };

  render() {
    const { title, questions } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Deck title={title} questions={questions} />
        <TouchableOpacity><Text>Add Card</Text></TouchableOpacity>
        <TouchableOpacity><Text>Start Quiz</Text></TouchableOpacity>
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
