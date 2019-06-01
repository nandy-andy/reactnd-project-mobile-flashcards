import React from 'react';
import { View, StyleSheet } from 'react-native';

import Quiz from '../components/Quiz';

export default class StartQuizScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
      const { deck } = navigation.state.params;

      return {
          title: deck + ' Quiz!'
      }
  };

  render() {
    const { deck, questions } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Quiz deck={deck} questions={questions} navigation={this.props.navigation} />
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
