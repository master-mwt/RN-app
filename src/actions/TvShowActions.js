import {
  EPISODE_NOT_SEEN,
  EPISODE_SEEN,
  TV_SHOW_ADDED_IN_COLLECTION,
  TV_SHOW_REMOVED_FROM_COLLECTION,
} from '../stores/ActionType';

export function addShowToCollection(show) {
  return {
    type: TV_SHOW_ADDED_IN_COLLECTION,
    payload: {show: show},
  };
}

export function removeShowFromCollection(show) {
  return {
    type: TV_SHOW_REMOVED_FROM_COLLECTION,
    payload: {show: show},
  };
}

export function episodeSeen(episode) {
  return {
    type: EPISODE_SEEN,
    payload: {episode: episode},
  };
}

export function episodeNotSeen(episode) {
  return {
    type: EPISODE_NOT_SEEN,
    payload: {episode: episode},
  };
}
