import {
  COLLECTION_NOT_WATCHED_EPISODES,
  COLLECTION_WATCHED_EPISODES,
  COLLECTION_ADD_TV_SHOW,
  COLLECTION_REMOVE_TV_SHOW,
} from '../stores/ActionType';

export function addShowToCollection(show) {
  return {
    type: COLLECTION_ADD_TV_SHOW,
    payload: {show: show},
  };
}

export function removeShowFromCollection(show) {
  return {
    type: COLLECTION_REMOVE_TV_SHOW,
    payload: {show: show},
  };
}

export function episodeSeen(episode) {
  return {
    type: COLLECTION_WATCHED_EPISODES,
    payload: {episode: episode},
  };
}

export function episodeNotSeen(episode) {
  return {
    type: COLLECTION_NOT_WATCHED_EPISODES,
    payload: {episode: episode},
  };
}
