import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { saveDeckTitle } from '../helpers/data';

export default class NewDeckScreen extends React.Component {
  static navigationOptions = {
      title: 'Add new deck',
  };

  state = {
      title: '',
      error: ''
  };

  handleTitleChange = (title) => {
      this.setState(() => {
          return {
              title,
              error: ''
          }
      });
  };

  submit = () => {
      const { title } = this.state;

      if (title === '') {
          this.setState(() => {
              return {
                  title,
                  error: 'The title cannot be empty'
              }
          });
      } else {
          saveDeckTitle(title);
          this.props.navigation.navigate('Deck', {
              title,
              questions: []
          });
      }
  };

  render() {
    const { title, error } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
          <Text>What's the title of the new deck?</Text>
          {error !== '' && <Text>{error}</Text>}
          <TextInput
            value={title}
            onChangeText={this.handleTitleChange}
          />
          <TouchableOpacity onPress={this.submit}><Text>Create new deck</Text></TouchableOpacity>
      </KeyboardAvoidingView>
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
