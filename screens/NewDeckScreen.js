import React from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import { saveDeckTitle } from '../helpers/data';
import { addDeck } from '../actions';

import { layout } from '../constants/Layout';
import Colors from '../constants/Colors';

class NewDeckScreen extends React.Component {
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
        const { dispatch, decks } = this.props;

        if (title === '') {
          this.setState(() => {
              return {
                  title,
                  error: 'The title cannot be empty'
              }
          });

          return;
        }

        if (decks[title]) {
            this.setState(() => {
                return {
                    title,
                    error: 'There is already a deck with this title'
                }
            });

            return;
        }

        dispatch(addDeck(title));
        saveDeckTitle(title);

        this.setState(() => {
            return {
                title: '',
                error: ''
            }
        });

        this.props.navigation.navigate('Deck', {
            title,
            questions: []
        });
    };

    render() {
        const { title, error } = this.state;

        return (
            <View style={layout.container}>
                <Text style={layout.header}>Add new deck</Text>
                <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>What's the title of the new deck?</Text>
                    {error !== '' && <Text style={layout.errorMessage}>{error}</Text>}
                    <TextInput
                        value={title}
                        onChangeText={this.handleTitleChange}
                        placeholder={'Type here the title...'}
                        style={layout.input}
                    />
                    <TouchableOpacity style={[layout.button, {backgroundColor: Colors.greenButton}]} onPress={this.submit}>
                        <Text>Create new deck</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(NewDeckScreen);
