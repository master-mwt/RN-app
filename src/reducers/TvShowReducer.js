import {
  COLLECTION_NOT_WATCHED_EPISODES,
  COLLECTION_WATCHED_EPISODES,
  COLLECTION_ADD_TV_SHOW,
  COLLECTION_REMOVE_TV_SHOW,
} from '../stores/ActionType';

const INITIAL_STATE = {
  shows: [],
};

const sTvShow = state => state.tv_show;
export const sTvShowGetUserShows = state => sTvShow(state).shows;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COLLECTION_ADD_TV_SHOW:
      return {
        ...state,
        shows: [...state.shows, action.payload.show],
      };
    case COLLECTION_REMOVE_TV_SHOW:
      return {
        ...state,
        shows: [
          ...state.shows.filter(item => {
            return item.id !== action.payload.show.id;
          }),
        ],
      };
    case COLLECTION_WATCHED_EPISODES:
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
    case COLLECTION_NOT_WATCHED_EPISODES:
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
