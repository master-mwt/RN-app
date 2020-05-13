import axios from 'axios';

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "609fbad41366e27a4f7a58d8d1760a3b";

// const TMDB_API_URL_TV_GET_DETAILS = `https://api.themoviedb.org/3/tv/1?api_key=${API_KEY}&language=en-US`;

function axiosGetRequest(link){
    return axios.get(link).
    then(response => response.data).
    catch(error => {
        throw error;
    });
}

export default class TMDBApi {
    getTvShowDetail(tvShowID) {
        let link = API_URL + 'tv/' + tvShowID + '?api_key=' + API_KEY + '&language=en-US';
        return axiosGetRequest(link);
    }

    getPopularTvShows(page = 1) {
        let link = API_URL + 'tv/popular' + '?api_key=' + API_KEY + '&language=en-US' + '&page=' + page;
        return axiosGetRequest(link);
    }

    getTopRatedTvShows(page = 1){
        let link = API_URL + 'tv/top_rated' + '?api_key=' + API_KEY + '&language=en-US' + '&page=' + page;
        return axiosGetRequest(link);
    }

    getSimilarTvShows(tvShowID, page = 1){
        let link = API_URL + 'tv/' + tvShowID + '/similar' + '?api_key=' + API_KEY + '&language=en-US' + '&page=' + page;
        return axiosGetRequest(link);
    }

    getTvShowSeason(tvShowID, seasonNumber){
        let link = API_URL + 'tv/' + tvShowID + '/season/' + seasonNumber + '?api_key=' + API_KEY + '&language=en-US';
        return axiosGetRequest(link);
    }

    getTvShowEpisode(tvShowID, seasonNumber, episodeNumber){
        let link = API_URL + 'tv/' + tvShowID + '/season/' + seasonNumber + '/episode/' + episodeNumber + '?api_key=' + API_KEY + '&language=en-US';
        return axiosGetRequest(link);
    }
}
