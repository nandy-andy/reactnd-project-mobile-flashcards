import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppLoading } from 'expo';

import { getDecks } from '../helpers/_DATA';

export default class HomeScreen extends React.Component {
  state = {
    decks: {},
    ready: false,
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.setState(() => {
      return {
        ready: true,
        decks: Object.values(getDecks())
      }
    });
  }

  render() {
    const { decks, ready } = this.state;

    if (ready === false) {
        return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>Decks list</Text>
            {decks.map((deck) => (<Text key={deck.title}>Deck</Text>))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});
