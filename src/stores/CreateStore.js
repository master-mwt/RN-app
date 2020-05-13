import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

export default reducers => {
  const middleware = [thunk, promise];
  const enhancers = [applyMiddleware(...middleware)];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const _persistReducer = persistReducer(persistConfig, reducers);
  const store = createStore(_persistReducer, composeEnhancers(...enhancers));
  const persistor = persistStore(store);
  return {store, persistor};
};
