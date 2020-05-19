import {
  END_LOADING,
  IN_LOADING,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
  loadingSeconds: 0,
  user: null,
};

const sApp = state => state.app;
export const sAppLoading = state => sApp(state).loading;
export const sAppLoadingSeconds = state => sApp(state).loadingSeconds;
export const sAppUser = state => sApp(state).user;

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
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload.user,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
