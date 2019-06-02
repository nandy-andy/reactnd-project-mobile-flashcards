import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import NewCardScreen from '../screens/NewCardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DeckScreen from '../screens/DeckScreen';
import StartQuizScreen from '../screens/StartQuizScreen';

import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Deck: DeckScreen,
  NewCard: NewCardScreen,
  StartQuiz: StartQuizScreen,
}, {
    headerMode: 'none'
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const NewDeckStack = createStackNavigator({
    NewDeckStack: NewDeckScreen,
}, {
    headerMode: 'none'
});

NewDeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  NewDeckStack,
  SettingsStack,
}, {
    tabBarOptions: {
        activeTintColor: Colors.tintColor,
        inactiveTintColor: Colors.inactiveTintColor,
        style: {
            backgroundColor: Colors.tabBar
        }
    }
});
