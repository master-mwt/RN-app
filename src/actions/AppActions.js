import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../stores/ActionType';

export function userLogin(user) {
  return {
    type: USER_LOGGED_IN,
    payload: {user: user},
  };
}

export function userLogout() {
  return {
    type: USER_LOGGED_OUT,
  };
}
