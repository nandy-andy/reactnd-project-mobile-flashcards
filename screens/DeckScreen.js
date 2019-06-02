import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import Deck from '../components/Deck';

class DeckScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
      const { title } = navigation.state.params;

      return {
          title
      }
  };

  render() {
    const { title, questions } = this.props;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Deck title={title} questions={questions} />
        <TouchableOpacity
          onPress={() => navigation.navigate(
              'NewCard',
              {
                  title: title
              }
          )}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(
              'StartQuiz',
              {
                  title: title
              }
          )}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params;

    return {
        title,
        questions: state[title].questions
    }
}

export default connect(
    mapStateToProps,
)(DeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
