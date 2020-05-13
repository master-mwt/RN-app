import {END_LOADING, IN_LOADING} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
  loadingSeconds: 0,
};

const sApp = state => state.app;
export const sAppLoading = state => sApp(state).loading;
export const sAppLoadingSeconds = state => sApp(state).loadingSeconds;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IN_LOADING:
      return {
        ...state,
        loadingSeconds: state.loadingSeconds + 1,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
