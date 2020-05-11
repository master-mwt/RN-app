import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigator from './navigators/RootNavigator';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    );
  }
}
