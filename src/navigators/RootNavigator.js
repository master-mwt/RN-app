import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomePage from '../pages/HomePage';
import HomeNewPage from '../pages/HomeNewPage';
import TvShowDetails from '../pages/TvShowDetails';

const DrawerStack = createDrawerNavigator();

export default function() {
  return (
    <NavigationContainer>
      <DrawerStack.Navigator initialRouteName="home_new">
        <DrawerStack.Screen name="home_new" component={HomeNewPage} />
        <DrawerStack.Screen name="home" component={HomePage} />
        {/*questo elemento non si dovrebbe vedere*/}
        <DrawerStack.Screen name="details" component={TvShowDetails} />
      </DrawerStack.Navigator>
    </NavigationContainer>
  );
}
