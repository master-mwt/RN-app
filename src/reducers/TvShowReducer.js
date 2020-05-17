import {
  EPISODE_NOT_SEEN,
  EPISODE_SEEN,
  TV_SHOW_ADDED_IN_COLLECTION,
  TV_SHOW_REMOVED_FROM_COLLECTION,
} from '../stores/ActionType';

const INITIAL_STATE = {
  shows: [],
};

const sTvShow = state => state.tv_show;
export const sTvShowGetUserShows = state => sTvShow(state).shows;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TV_SHOW_ADDED_IN_COLLECTION:
      return {
        ...state,
        shows: [...state.shows, action.payload.show],
      };
    case TV_SHOW_REMOVED_FROM_COLLECTION:
      return {
        ...state,
        shows: [
          ...state.shows.filter(item => {
            return item.id !== action.payload.show.id;
          }),
        ],
      };
    case EPISODE_SEEN:
      console.log(action.payload.episode.id);

      console.log('before map');
      console.log(state.shows);

      let array = state.shows.map(show => {
        if (show.id === action.payload.episode.tv_show_id) {
          return {
            id: show.id,
            seen_episodes: [...show.seen_episodes, action.payload.episode.id],
          };
        } else {
          return {id: show.id, seen_episodes: [...show.seen_episodes]};
        }
      });

      console.log('after map');
      console.log(array);

      return {
        ...state,
        shows: [...array],
      };
    case EPISODE_NOT_SEEN:
      console.log(action.payload.episode.id);

      console.log('before map');
      console.log(state.shows);

      let array_not_seen = state.shows.map(show => {
        if (show.id === action.payload.episode.tv_show_id) {
          return {
            id: show.id,
            seen_episodes: [
              ...show.seen_episodes.filter(item => {
                return item !== action.payload.episode.id;
              }),
            ],
          };
        } else {
          return {id: show.id, seen_episodes: [...show.seen_episodes]};
        }
      });

      console.log('after map');
      console.log(array_not_seen);

      return {
        ...state,
        shows: [...array_not_seen],
      };
    default:
      return state;
  }
}
