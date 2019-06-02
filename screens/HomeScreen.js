import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'
import { AppLoading } from 'expo';

import { getDecks } from '../helpers/data';
import { receiveDecks } from '../actions';

import Deck from '../components/Deck';

class HomeScreen extends React.Component {
  state = {
    ready: false,
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
      const { dispatch } = this.props;

      getDecks().then((data) => {
          try {
              return JSON.parse(data);
          } catch (e) {
              return {};
          }
      }).then((decks) => {
          dispatch(receiveDecks(decks))
      }).then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

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
            {Object.values(decks).map((deck) => (
                <TouchableOpacity
                    key={deck.title}
                    onPress={() => this.props.navigation.navigate(
                        'Deck',
                        {
                            title: deck.title
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

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps,
)(HomeScreen);

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
