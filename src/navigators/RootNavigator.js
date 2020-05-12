import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomePage from '../pages/HomePage';

const DrawerStack = createDrawerNavigator();

export default function() {
  return (
    <NavigationContainer>
      <DrawerStack.Navigator>
        <DrawerStack.Screen name="home" component={HomePage} />
      </DrawerStack.Navigator>
    </NavigationContainer>
  );
}
