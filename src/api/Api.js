import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '609fbad41366e27a4f7a58d8d1760a3b';

// const TMDB_API_URL_TV_GET_DETAILS = `https://api.themoviedb.org/3/tv/1?api_key=${API_KEY}&language=en-US`;

/**
 * Function that perform a GET Axios Request
 *
 * @param link Request URL
 * @returns {Promise<T>}
 */
function axiosGetRequest(link) {
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
function getTvShowDetail(tvShowID) {
  let link =
    API_URL +
      'tv/' +
      tvShowID +
      '?api_key=' +
      API_KEY +
      '&language=en-US';
  return axiosGetRequest(link);
}

/**
 * Get populars TvShows
 *
 * @param page The requested page
 * @returns {Promise<* | void>}
 */
function getPopularTvShows(page = 1) {
  let link =
    API_URL +
    'tv/popular' +
    '?api_key=' +
    API_KEY +
    '&language=en-US' +
    '&page=' +
    page;
  return axiosGetRequest(link);
}

/**
 * Get top rated TvShows
 *
 * @param page The requested page
 * @returns {Promise<* | void>}
 */
function getTopRatedTvShows(page = 1) {
  let link =
    API_URL +
    'tv/top_rated' +
    '?api_key=' +
    API_KEY +
    '&language=en-US' +
    '&page=' +
    page;
  return axiosGetRequest(link);
}

/**
 * Get similar TvShows
 *
 * @param tvShowID TvShow ID
 * @param page The requested page
 * @returns {Promise<* | void>}
 */
function getSimilarTvShows(tvShowID, page = 1) {
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
  return axiosGetRequest(link);
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
  return axiosGetRequest(link);
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
  return axiosGetRequest(link);
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
  return axiosGetRequest(link);
}

export {
  getTvShowDetail,
  getPopularTvShows,
  getTopRatedTvShows,
  getSimilarTvShows,
  getTvShowSeason,
  getTvShowEpisode,
  getTvShowCredits,
};
