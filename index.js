import 'react-native-gesture-handler';
import React, {Component} from 'react';
import createStore from './src/stores';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const {store, persistor} = createStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
