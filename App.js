import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  render() {
      return (
          <Provider store={createStore(reducer)}>
              <View style={styles.container}>
                  {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                  <AppNavigator />
              </View>
          </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
