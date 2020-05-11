import {IN_LOADING, END_LOADING} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
};

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
