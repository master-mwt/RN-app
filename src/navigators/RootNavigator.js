import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import HomeNewPage from '../pages/HomeNewPage';
import TvShowDetails from '../pages/TvShowDetails';
import TopRatedTvShowPage from '../pages/TopRatedTvShowPage';
import SearchPage from '../pages/SearchPage';
import SeasonPage from '../pages/SeasonPage';
import EpisodePage from '../pages/EpisodePage';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <MaterialTopTabNavigator.Screen
          name="top_rated"
          component={TopRatedTvShowPage}
        />
        {/* <MaterialTopTabNavigator.Screen name="home_old" component={HomePage} /> */}
      </MaterialTopTabNavigator.Navigator>
    );

    const createHomeStack = () => (
      <StackNavigator.Navigator initialRouteName="main">
        <StackNavigator.Screen name="main" children={createHomeTopTab} />
        <StackNavigator.Screen name="details" component={TvShowDetails} />
        <StackNavigator.Screen name="season" component={SeasonPage} />
        <StackNavigator.Screen name="episode" component={EpisodePage} />
      </StackNavigator.Navigator>
    );

    return (
      <NavigationContainer>
        <BottomTabNavigator.Navigator initialRouteName="main">
          <BottomTabNavigator.Screen
            name="main"
            component={createHomeStack}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="ios-home" color={color} size={size} />
              ),
            }}
          />
          <BottomTabNavigator.Screen name="search" component={SearchPage} />
        </BottomTabNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
