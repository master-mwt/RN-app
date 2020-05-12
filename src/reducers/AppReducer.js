import {
  IN_LOADING,
  END_LOADING,
  TV_SHOW_GET_DETAIL, POPULAR_TV_SHOWS,
} from '../stores/ActionType';

const INITIAL_STATE = {
  loading: true,
  loadingSeconds: 0,
  tvshow: null,
  popularTvShows: null,
};

const sTvShow = state => state.app;
export const sLoadedTvShow = state => sTvShow(state).tvshow;
export const sLoadingTvShow = state => sTvShow(state).loading;
export const sLoadedPopularsTvShows = state => sTvShow(state).popularTvShows;

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
    /* Popular tv shows */
    case `${POPULAR_TV_SHOWS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${POPULAR_TV_SHOWS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${POPULAR_TV_SHOWS}_FULFILLED`:
      return {
        ...state,
        popularTvShows: action.payload.popularTvShows,
        loading: false,
      };
    default:
      return state;
  }
}
