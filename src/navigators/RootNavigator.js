import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import TvShowsPopularPage from '../pages/TvShowsPopularPage';
import TvShowDetails from '../pages/TvShowDetailsPage';
import TvShowsTopRatedPage from '../pages/TvShowsTopRatedPage';
import TvShowsSearchPage from '../pages/TvShowsSearchPage';
import TvShowSeasonPage from '../pages/TvShowSeasonPage';
import TvShowEpisodePage from '../pages/TvShowEpisodePage';
import FileHandlePage from '../pages/FileHandlePage';
import TvShowsCollectionPage from '../pages/TvShowsCollectionPage';

const StackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
const BottomTabNavigator = createBottomTabNavigator();
const DrawerNavigator = createDrawerNavigator();
//const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();

export default class RootNavigator extends Component {
  render() {
    const createHomeTopTab = () => (
      <MaterialTopTabNavigator.Navigator initialRouteName="tv_shows_popular">
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

    const createHomeStack = () => (
      <StackNavigator.Navigator initialRouteName="tv_shows_explore">
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
      <StackNavigator.Navigator initialRouteName="search">
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

    const createCollectionMain = () => (
      <StackNavigator.Navigator
        initialRouteName="collection_main"
        screenOptions={{headerShown: false}}>
        <StackNavigator.Screen
          name="collection_main"
          component={createCollectionDrawer}
          options={{
            title: 'collection_main',
          }}
        />
      </StackNavigator.Navigator>
    );

    const createCollectionDrawer = () => (
      <DrawerNavigator.Navigator>
        <DrawerNavigator.Screen
          name="collection"
          component={createCollectionStack}
        />
        <DrawerNavigator.Screen name="file" component={FileHandlePage} />
      </DrawerNavigator.Navigator>
    );

    const createCollectionStack = () => (
      <StackNavigator.Navigator initialRouteName="collection">
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

    return (
      <NavigationContainer>
        <BottomTabNavigator.Navigator initialRouteName="explore">
          <BottomTabNavigator.Screen
            name="search"
            component={createSearchStack}
            options={{
              tabBarLabel: 'search',
              tabBarIcon: ({color}) => (
                <Icon name="ios-search" color={color} size={30} />
              ),
            }}
          />
          <BottomTabNavigator.Screen
            name="explore"
            component={createHomeStack}
            options={{
              tabBarLabel: 'explore',
              tabBarIcon: ({color}) => (
                <Icon name="ios-eye" color={color} size={30} />
              ),
            }}
          />
          <BottomTabNavigator.Screen
            name="collection"
            component={createCollectionMain}
            options={{
              tabBarLabel: 'collection',
              tabBarIcon: ({color}) => (
                <Icon name="ios-person" color={color} size={30} />
              ),
            }}
          />
        </BottomTabNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
