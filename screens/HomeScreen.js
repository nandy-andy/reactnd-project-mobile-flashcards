import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { AppLoading } from 'expo';

import { getDecks } from '../helpers/data';

import Deck from '../components/Deck';

export default class HomeScreen extends React.Component {
  state = {
    decks: {},
    ready: false,
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
      getDecks().then((data) => {
          try {
              return JSON.parse(data);
          } catch (e) {
              return {};
          }
      }).then((decks) => {
          console.log(decks);

          this.setState(() => {
              return {
                  ready: true,
                  decks: Object.values(decks)
              };
          });
      });
  }

  render() {
    const { decks, ready } = this.state;

    if (ready === false) {
        return <AppLoading />
    }

    if (decks.length === 0) {
        return (
          <View style={styles.container}>
            <Text style={styles.noDecks}>
              You haven't created any deck yet. Once you add it, it'll show up here! :-)
            </Text>
          </View>
        );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>Decks list</Text>
            {decks.map((deck) => (
                <TouchableOpacity
                    key={deck.title}
                    onPress={() => this.props.navigation.navigate(
                        'Deck',
                        {
                            title: deck.title,
                            questions: deck.questions
                        }
                    )}>
                    <Deck title={deck.title} questions={deck.questions} />
                </TouchableOpacity>
            ))}
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
  },
  noDecks: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 400,
    marginLeft: 30,
    marginRight: 30
  }
});
