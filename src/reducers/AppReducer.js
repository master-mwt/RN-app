import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
  loadingSeconds: 0,
  user: null,
  logged: false,
};

const sApp = state => state.app;
export const sAppLoading = state => sApp(state).loading;
export const sAppLoadingSeconds = state => sApp(state).loadingSeconds;
export const sAppUser = state => sApp(state).user;
export const sAppUserLogged = state => sApp(state).logged;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload.user,
        logged: true,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
        logged: false,
      };
    default:
      return state;
  }
}
