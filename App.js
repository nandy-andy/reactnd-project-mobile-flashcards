import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Constants } from 'expo';

import reducer from './reducers';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';

function MobileFlashcardsStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class App extends React.Component {
  render() {
      return (
          <Provider store={createStore(reducer)}>
              <View style={styles.container}>
                  <MobileFlashcardsStatusBar backgroundColor={Colors.background} barStyle="light-content" />
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
