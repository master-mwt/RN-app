import {TV_SHOWS_GET_POPULAR} from '../stores/ActionType';
import * as API from '../api/Api';

export function tvShowsGetPopularFetch() {
  return {
    type: TV_SHOWS_GET_POPULAR,
    payload: API.getPopularTvShows().then(r => ({tv_shows_get_popular: r})),
  };
}
