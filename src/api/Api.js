import axios from 'axios';

// TODO: Refactor

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "609fbad41366e27a4f7a58d8d1760a3b";

const TMDB_API_URL_TV_GET_DETAILS = `https://api.themoviedb.org/3/tv/1?api_key=${API_KEY}&language=en-US`;

function getTvShowDetailUrl(tvSeriesID){
    return API_URL + "tv/" + tvSeriesID + '?api_key=' + API_KEY + '&language=en-US';
}

export function getTvShowDetail() {
    return axios.get(getTvShowDetailUrl(1)).
    then(response => response.data).
    catch(error => {
        throw error;
    });
}
