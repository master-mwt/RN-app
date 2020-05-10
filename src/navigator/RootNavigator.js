import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomePage from '../pages/HomePage';

const DrawerStack = createDrawerNavigator();

export default class RootNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <DrawerStack.Navigator>
          <DrawerStack.Screen name="main" component={HomePage} />
        </DrawerStack.Navigator>
      </NavigationContainer>
    );
  }
}
