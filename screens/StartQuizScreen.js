import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import Quiz from '../components/Quiz';

class StartQuizScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
      const { title } = navigation.state.params;

      return {
          title: title + ' Quiz!'
      }
  };

  render() {
    const { deck, questions } = this.props;

    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
