import {combineReducers} from 'redux';

import AppReducer from './AppReducer';
import TvShowReducer from './TvShowReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  tv_show: TvShowReducer,
});

export default rootReducer;
