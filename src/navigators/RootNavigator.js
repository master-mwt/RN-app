import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomePage from '../pages/HomePage';
import HomeNewPage from '../pages/HomeNewPage';
import TvShowDetails from '../pages/TvShowDetails';

const StackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
const BottomTabNavigator = createBottomTabNavigator();
//requires react-native-vector-icons
//const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();

export default class RootNavigator extends Component {
  render() {
    const createHomeTopTab = () => (
      <MaterialTopTabNavigator.Navigator initialRouteName="home_new">
        <MaterialTopTabNavigator.Screen
          name="home_new"
          component={HomeNewPage}
        />
        <MaterialTopTabNavigator.Screen name="home_old" component={HomePage} />
      </MaterialTopTabNavigator.Navigator>
    );

    const createHomeStack = () => (
      <StackNavigator.Navigator initialRouteName="main">
        <StackNavigator.Screen name="main" children={createHomeTopTab} />
        <StackNavigator.Screen name="details" component={TvShowDetails} />
      </StackNavigator.Navigator>
    );

    return (
      <NavigationContainer>
        <BottomTabNavigator.Navigator initialRouteName="main">
          <BottomTabNavigator.Screen name="main" component={createHomeStack} />
        </BottomTabNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
