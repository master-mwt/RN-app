import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomePage from '../pages/HomePage';
import HomeNewPage from '../pages/HomeNewPage';

const DrawerStack = createDrawerNavigator();

export default function() {
  return (
    <NavigationContainer>
      <DrawerStack.Navigator>
        <DrawerStack.Screen name="home_new" component={HomeNewPage} />
        <DrawerStack.Screen name="home" component={HomePage} />
      </DrawerStack.Navigator>
    </NavigationContainer>
  );
}
