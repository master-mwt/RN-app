import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import TvShowsPopularPage from '../pages/TvShowsPopularPage';
import TvShowDetails from '../pages/TvShowDetailsPage';
import TvShowsTopRatedPage from '../pages/TvShowsTopRatedPage';
import TvShowsSearchPage from '../pages/TvShowsSearchPage';
import TvShowSeasonPage from '../pages/TvShowSeasonPage';
import TvShowEpisodePage from '../pages/TvShowEpisodePage';
import UserSettingsPage from '../pages/UserSettingsPage';
import TvShowsCollectionPage from '../pages/UserCollectionPage';
import UserLoginPage from '../pages/UserLoginPage';
import UserRegisterPage from '../pages/UserRegisterPage';

const StackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
//const BottomTabNavigator = createBottomTabNavigator();
//const DrawerNavigator = createDrawerNavigator();
const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();

export default class RootNavigator extends Component {
  render() {
    const createHomeTopTab = () => (
      <MaterialTopTabNavigator.Navigator
        initialRouteName="tv_shows_popular"
        tabBarOptions={{
          activeTintColor: '#694fad',
          indicatorStyle: {
            backgroundColor: '#694fad',
          },
        }}>
        <MaterialTopTabNavigator.Screen
          name="tv_shows_popular"
          component={TvShowsPopularPage}
          options={{
            tabBarLabel: 'popular',
          }}
        />
        <MaterialTopTabNavigator.Screen
          name="tv_shows_top_rated"
          component={TvShowsTopRatedPage}
          options={{
            tabBarLabel: 'top rated',
          }}
        />
      </MaterialTopTabNavigator.Navigator>
    );

    const createExploreStack = () => (
      <StackNavigator.Navigator
        initialRouteName="tv_shows_explore"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}>
        <StackNavigator.Screen
          name="tv_shows_explore"
          component={createHomeTopTab}
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
          component={TvShowSeasonPage}
          options={{
            title: 'season',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_episode"
          component={TvShowEpisodePage}
          options={{
            title: 'episode',
          }}
        />
      </StackNavigator.Navigator>
    );

    const createSearchStack = () => (
      <StackNavigator.Navigator
        initialRouteName="search"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}>
        <StackNavigator.Screen
          name="search"
          component={TvShowsSearchPage}
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
          component={TvShowSeasonPage}
          options={{
            title: 'season',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_episode"
          component={TvShowEpisodePage}
          options={{
            title: 'episode',
          }}
        />
      </StackNavigator.Navigator>
    );

    const createCollectionStack = () => (
      <StackNavigator.Navigator
        initialRouteName="collection"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}>
        <StackNavigator.Screen
          name="collection"
          component={TvShowsCollectionPage}
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
          component={TvShowSeasonPage}
          options={{
            title: 'season',
          }}
        />
        <StackNavigator.Screen
          name="tv_show_episode"
          component={TvShowEpisodePage}
          options={{
            title: 'episode',
          }}
        />
      </StackNavigator.Navigator>
    );

    const createSettingsStack = () => (
      <StackNavigator.Navigator
        initialRouteName="settings"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#d02860',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}>
        <StackNavigator.Screen name="settings" component={UserSettingsPage} />
        <StackNavigator.Screen name="login" component={UserLoginPage} />
        <StackNavigator.Screen name="register" component={UserRegisterPage} />
      </StackNavigator.Navigator>
    );

    return (
      <NavigationContainer>
        <MaterialBottomTabNavigator.Navigator
          initialRouteName="explore"
          shifting={true}>
          <MaterialBottomTabNavigator.Screen
            name="search"
            component={createSearchStack}
            options={{
              tabBarLabel: 'search',
              tabBarColor: '#1f65ff',
              tabBarIcon: ({color}) => (
                <Icon name="ios-search" color={color} size={25} />
              ),
            }}
          />
          <MaterialBottomTabNavigator.Screen
            name="explore"
            component={createExploreStack}
            options={{
              tabBarLabel: 'explore',
              tabBarColor: '#694fad',
              tabBarIcon: ({color}) => (
                <Icon name="ios-eye" color={color} size={25} />
              ),
            }}
          />
          <MaterialBottomTabNavigator.Screen
            name="collection"
            component={createCollectionStack}
            options={{
              tabBarLabel: 'collection',
              tabBarColor: '#009387',
              tabBarIcon: ({color}) => (
                <Icon name="ios-person" color={color} size={25} />
              ),
            }}
          />
          <MaterialBottomTabNavigator.Screen
            name="settings"
            component={createSettingsStack}
            options={{
              tabBarLabel: 'settings',
              tabBarColor: '#d02860',
              tabBarIcon: ({color}) => (
                <Icon name="ios-settings" color={color} size={25} />
              ),
            }}
          />
        </MaterialBottomTabNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
