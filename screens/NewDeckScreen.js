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
      title: 'Enter your deck name'
  };

  handleTitleChange = (title) => {
      this.setState(() => {
          return {
              title
          }
      });
  };

  submit = () => {
      saveDeckTitle(this.state.title);
      this.props.navigation.navigate('Home');
  };

  render() {
    const { title } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
          <Text>What's the title of the new deck?</Text>
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
