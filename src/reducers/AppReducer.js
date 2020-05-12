import {
  IN_LOADING,
  END_LOADING,
  TV_SHOW_GET_DETAIL,
} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
  loadingSeconds: 0,
  tvshow: null,
};

const sTvShow = state => state.tvshow;
export const sLoadedTvShow = state => sTvShow(state).tvshow;
export const sLoadingTvShow = state => sTvShow(state).loading;

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
    case `${TV_SHOW_GET_DETAIL}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${TV_SHOW_GET_DETAIL}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${TV_SHOW_GET_DETAIL}_FULFILLED`:
      return {
        ...state,
        tvshow: action.payload.tvshow,
        loading: false,
      };
    default:
      return state;
  }
}
