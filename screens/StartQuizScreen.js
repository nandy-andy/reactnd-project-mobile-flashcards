import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class StartQuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Quiz!',
  };

  render() {
    const { questions } = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(questions)}</Text>
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
