import axios from 'axios';

// TODO: Refactor

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "609fbad41366e27a4f7a58d8d1760a3b";

const TMDB_API_URL_TV_GET_DETAILS = `https://api.themoviedb.org/3/tv/1?api_key=${API_KEY}&language=en-US`;

/**
 * TMDB Url constructor function
 *
 * @param request TvSeriesTvID or 'Popular'
 * @returns {string} Url
 */
function tvUrlConstructor(request){
    return API_URL + "tv/" + request + '?api_key=' + API_KEY + '&language=en-US';
}

export function getTvShowDetail() {
    return axios.get(tvUrlConstructor(1)).
    then(response => response.data).
    catch(error => {
        throw error;
    });
}

export function getPopularTvShows() {
    return axios.get(tvUrlConstructor('popular')).
    then(response => response.data).
    catch(error => {
        throw error;
    });
}
