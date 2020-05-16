import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeNewPage from '../pages/HomeNewPage';
import TvShowDetails from '../pages/TvShowDetails';
import TopRatedTvShowPage from '../pages/TopRatedTvShowPage';
import SearchPage from '../pages/SearchPage';
import SeasonPage from '../pages/SeasonPage';
import EpisodePage from '../pages/EpisodePage';
import FileHandlePage from '../pages/FileHandlePage';

const StackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
const BottomTabNavigator = createBottomTabNavigator();
//const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();

export default class RootNavigator extends Component {
  render() {
    const createHomeTopTab = () => (
      <MaterialTopTabNavigator.Navigator initialRouteName="tv_shows_popular">
        <MaterialTopTabNavigator.Screen
          name="tv_shows_popular"
          component={HomeNewPage}
          options={{
            tabBarLabel: 'popular',
          }}
        />
        <MaterialTopTabNavigator.Screen
          name="tv_shows_top_rated"
          component={TopRatedTvShowPage}
          options={{
            tabBarLabel: 'top rated',
          }}
        />
        {/* <MaterialTopTabNavigator.Screen name="home_old" component={HomePage} /> */}
      </MaterialTopTabNavigator.Navigator>
    );

    const createHomeStack = () => (
      <StackNavigator.Navigator initialRouteName="tv_shows_explore">
        <StackNavigator.Screen
          name="tv_shows_explore"
          children={createHomeTopTab}
          options={{
            title: 'explore',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_details"
          component={TvShowDetails}
          options={{
            title: 'details',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_season"
          component={SeasonPage}
          options={{
            title: 'season',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_episode"
          component={EpisodePage}
          options={{
            title: 'episode',
          }}
        />
      </StackNavigator.Navigator>
    );

    const createSearchStack = () => (
      <StackNavigator.Navigator initialRouteName="search">
        <StackNavigator.Screen
          name="search"
          component={SearchPage}
          options={{
            title: 'search',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_details"
          component={TvShowDetails}
          options={{
            title: 'details',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_season"
          component={SeasonPage}
          options={{
            title: 'season',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_episode"
          component={EpisodePage}
          options={{
            title: 'episode',
          }}
        />
      </StackNavigator.Navigator>
    );

    return (
      <NavigationContainer>
        <BottomTabNavigator.Navigator initialRouteName="explore">
          <BottomTabNavigator.Screen
            name="search"
            component={createSearchStack}
            options={{
              tabBarLabel: 'search',
              tabBarIcon: ({color}) => (
                <Icon name="ios-search" color={color} size={26} />
              ),
            }}
          />
          <BottomTabNavigator.Screen
            name="explore"
            component={createHomeStack}
            options={{
              tabBarLabel: 'explore',
              tabBarIcon: ({color}) => (
                <Icon name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <BottomTabNavigator.Screen
            name="file"
            component={FileHandlePage}
            options={{
              tabBarLabel: 'file',
              tabBarIcon: ({color}) => (
                <Icon name="ios-menu" color={color} size={26} />
              ),
            }}
          />
        </BottomTabNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
