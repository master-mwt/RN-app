import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '609fbad41366e27a4f7a58d8d1760a3b';

/**
 * Function that perform a GET Axios Request
 *
 * @param link Request URL
 * @returns {Promise<T>}
 */
function doRequest(link) {
  return axios
    .get(link)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

/**
 * Get the detail of a TvShow
 *
 * @param tvShowID TvShow ID
 * @returns {Promise<* | void>}
 */
function getTvShowDetails(tvShowID) {
  let link =
    API_URL + 'tv/' + tvShowID + '?api_key=' + API_KEY + '&language=en-US';
  return doRequest(link);
}

/**
 * Get populars TvShows
 *
 * @param page The requested page
 * @returns {Promise<* | void>}
 */
function getTvShowsPopular(page = 1) {
  let link =
    API_URL +
    'tv/popular' +
    '?api_key=' +
    API_KEY +
    '&language=en-US' +
    '&page=' +
    page;
  return doRequest(link);
}

/**
 * Get top rated TvShows
 *
 * @param page The requested page
 * @returns {Promise<* | void>}
 */
function getTvShowsTopRated(page = 1) {
  let link =
    API_URL +
    'tv/top_rated' +
    '?api_key=' +
    API_KEY +
    '&language=en-US' +
    '&page=' +
    page;
  return doRequest(link);
}

/**
 * Get similar TvShows
 *
 * @param tvShowID TvShow ID
 * @param page The requested page
 * @returns {Promise<* | void>}
 */
function getTvShowSimilars(tvShowID, page = 1) {
  let link =
    API_URL +
    'tv/' +
    tvShowID +
    '/similar' +
    '?api_key=' +
    API_KEY +
    '&language=en-US' +
    '&page=' +
    page;
  return doRequest(link);
}

/**
 * Get a TvShow Season
 *
 * @param tvShowID TvShow ID
 * @param seasonNumber The requested season number
 * @returns {Promise<* | void>}
 */
function getTvShowSeason(tvShowID, seasonNumber) {
  let link =
    API_URL +
    'tv/' +
    tvShowID +
    '/season/' +
    seasonNumber +
    '?api_key=' +
    API_KEY +
    '&language=en-US';
  return doRequest(link);
}

/**
 * Get a TvShow Episode
 *
 * @param tvShowID TvShow ID
 * @param seasonNumber The requested season number
 * @param episodeNumber The requested episode number
 * @returns {Promise<* | void>}
 */
function getTvShowEpisode(tvShowID, seasonNumber, episodeNumber) {
  let link =
    API_URL +
    'tv/' +
    tvShowID +
    '/season/' +
    seasonNumber +
    '/episode/' +
    episodeNumber +
    '?api_key=' +
    API_KEY +
    '&language=en-US';
  return doRequest(link);
}

/**
 * Get the credits of a TvShow (cast and crew)
 *
 * @param tvShowID TvShow ID
 * @returns {Promise<* | void>}
 */
function getTvShowCredits(tvShowID) {
  let link =
    API_URL +
    'tv/' +
    tvShowID +
    '/credits' +
    '?api_key=' +
    API_KEY +
    '&language=en-US';
  return doRequest(link);
}

/**
 * Search a TvShow given a query string
 *
 * @returns {Promise<* | void>}
 * @param query The query string
 * @param page The requested page
 */
function doTvShowsSearch(query, page = 1) {
  let link =
    API_URL +
    'search/tv' +
    '?api_key=' +
    API_KEY +
    '&query=' +
    query +
    '&page=' +
    page +
    '&language=en-US';
  return doRequest(link);
}

export {
  getTvShowDetails,
  getTvShowsPopular,
  getTvShowsTopRated,
  getTvShowSimilars,
  getTvShowSeason,
  getTvShowEpisode,
  getTvShowCredits,
  doTvShowsSearch,
};
