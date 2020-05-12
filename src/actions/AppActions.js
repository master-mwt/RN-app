import {POPULAR_TV_SHOWS, TV_SHOW_GET_DETAIL} from '../stores/ActionType';
import * as API from '../api/Api';

export function fetchTvShowDetails() {
  return {
    type: TV_SHOW_GET_DETAIL,
    payload: API.getTvShowDetail().then(r => ({tvshow: r})),
  };
}

export function fetchPopularTvShows() {
  return {
    type: POPULAR_TV_SHOWS,
    payload: API.getPopularTvShows().then(r => ({popularTvShows: r})),
  };
}
