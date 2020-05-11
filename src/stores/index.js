import configureStore from './CreateStore';
import reducers from '../reducers';

export default function() {
  return configureStore(reducers);
}
