import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import Deck from '../components/Deck';

import { layout } from '../constants/Layout';

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
            <View style={[layout.container]}>
                <Text style={layout.header}>{title}</Text>
                <View style={{alignItems: 'center'}}>
                    <Deck title={title} questions={questions} />
                    <TouchableOpacity
                        style={layout.button}
                        onPress={() => navigation.navigate(
                            'StartQuiz',
                            {
                              title: title
                            }
                        )}
                    >
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={layout.button}
                        onPress={() => navigation.navigate(
                            'NewCard',
                            {
                              title: title
                            }
                        )}
                    >
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                </View>
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
