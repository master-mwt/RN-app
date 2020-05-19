import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigator from './navigators/RootNavigator';
import BackgroundService from './BackgroundService';

export default class App extends Component {
  render() {
    return (
      <>
        <BackgroundService />
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </>
    );
  }
}
