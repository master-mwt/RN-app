import {TV_SHOW_GET_DETAIL, TV_SHOWS_GET_POPULAR} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
  tv_show_get_detail: null,
  tv_shows_get_popular: null,
};

const sTvShow = state => state.tv_show;
export const sTvShowGetDetail = state => sTvShow(state).tv_show_get_detail;
export const sTvShowGetPopular = state => sTvShow(state).tv_shows_get_popular;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
        tv_show_get_detail: action.payload.tv_show_get_detail,
        loading: false,
      };
    case `${TV_SHOWS_GET_POPULAR}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${TV_SHOWS_GET_POPULAR}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${TV_SHOWS_GET_POPULAR}_FULFILLED`:
      return {
        ...state,
        tv_shows_get_popular: action.payload.tv_shows_get_popular,
        loading: false,
      };
    default:
      return state;
  }
}
