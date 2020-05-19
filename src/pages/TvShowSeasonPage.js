import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as API from '../api/Api';
import Icon from 'react-native-vector-icons/Ionicons';
import {sTvShowGetUserShows} from '../reducers/TvShowReducer';
import {episodeNotSeen, episodeSeen} from '../actions';
import {connect} from 'react-redux';

class TvShowSeasonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tv_show_season: null,
      in_collection: false,
      total_number_of_episodes: 0,
      number_of_seen_episodes: 0,
      mark_all_as_seen_button_text: 'mark all episodes as seen',
      mark_all_as_not_seen_button_text: 'mark all episodes as not seen',
    };
  }

  componentDidMount() {
    API.getTvShowSeason(
      this.props.route.params.item.tv_show_id,
      this.props.route.params.item.season_number,
    ).then(res => {
      this.setState({
        tv_show_season: res,
      });
      for (let i of this.props.collection) {
        if (i.id === this.props.route.params.item.tv_show_id) {
          this.setState({
            in_collection: true,
            number_of_seen_episodes: this.seenEpisodeCount(
              i.seen_episodes,
              res.episodes,
            ),
            total_number_of_episodes: res.episodes.length,
          });
        }
      }
      console.log(this.state.tv_show_season);
    });
  }

  seenEpisodeCount(seenEpisodes, episodes) {
    let count = 0;
    for (let i of seenEpisodes) {
      for (let j of episodes) {
        if (i === j.id) {
          count++;
        }
      }
    }
    return count;
  }

  episodeIsWatched(episodeId) {
    for (let i of this.props.collection) {
      for (let j of i.seen_episodes) {
        if (j === episodeId) {
          return true;
        }
      }
    }
    return false;
  }

  markAllAsSeen() {
    for (let i of this.props.collection) {
      if (i.id === this.props.route.params.item.tv_show_id) {
        this.state.tv_show_season.episodes.map((episode, key) => {
          if (!i.seen_episodes.includes(episode.id)) {
            this.props.episodeSeen({
              id: episode.id,
              tv_show_id: this.props.route.params.item.tv_show_id,
            });
          }
        });
      }
    }
    this.setState({
      number_of_seen_episodes: this.state.total_number_of_episodes,
    });
  }

  markAllAsNotSeen() {
    for (let i of this.props.collection) {
      if (i.id === this.props.route.params.item.tv_show_id) {
        this.state.tv_show_season.episodes.map((episode, key) => {
          if (i.seen_episodes.includes(episode.id)) {
            this.props.episodeNotSeen({
              id: episode.id,
              tv_show_id: this.props.route.params.item.tv_show_id,
            });
          }
        });
      }
    }
    this.setState({
      number_of_seen_episodes: 0,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        {!this.state.tv_show_season && (
          <ActivityIndicator
            style={styles.loading_icon}
            size="large"
            color="#000"
          />
        )}
        {this.state.tv_show_season && (
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollview_container}
              showsVerticalScrollIndicator={false}>
              <View style={styles.box}>
                <Image
                  style={styles.backdrop_image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${
                      this.state.tv_show_season.poster_path
                    }`,
                  }}
                />
              </View>
              <View style={styles.box}>
                <Text style={styles.title}>
                  {this.state.tv_show_season.name}
                </Text>
              </View>

              {this.state.in_collection &&
                this.state.total_number_of_episodes !==
                  this.state.number_of_seen_episodes && (
                  <View style={styles.mark_all_button_container}>
                    <TouchableOpacity
                      style={styles.mark_all_as_seen_button}
                      onPress={() => {
                        this.markAllAsSeen();
                      }}>
                      <Icon
                        name="ios-checkmark-circle-outline"
                        size={20}
                        color="#000"
                        style={styles.mark_all_button_icon}
                      />
                      <Text style={styles.mark_all_button_text}>
                        {this.state.mark_all_as_seen_button_text}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

              {this.state.in_collection &&
                this.state.number_of_seen_episodes !== 0 && (
                  <View style={styles.mark_all_button_container}>
                    <TouchableOpacity
                      style={styles.mark_all_as_not_seen_button}
                      onPress={() => {
                        this.markAllAsNotSeen();
                      }}>
                      <Icon
                        name="ios-close-circle-outline"
                        size={20}
                        color="#000"
                        style={styles.mark_all_button_icon}
                      />
                      <Text style={styles.mark_all_button_text}>
                        {this.state.mark_all_as_not_seen_button_text}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

              <View style={styles.box}>
                {this.state.tv_show_season.episodes.map((episode, key) => (
                  <TouchableOpacity
                    key={episode.id.toString()}
                    style={styles.episode_container}
                    onPress={() => {
                      this.props.navigation.navigate('tv_show_episode', {
                        item: {
                          tv_show_id: this.props.route.params.item.tv_show_id,
                          season_number: this.state.tv_show_season
                            .season_number,
                          episode_number: episode.episode_number,
                        },
                      });
                    }}>
                    <View style={styles.episode_start_container}>
                      <View style={styles.episode_number_container}>
                        <Text style={styles.episode_number}>
                          {episode.episode_number}
                        </Text>
                      </View>
                      <View style={styles.episode_text_container}>
                        <Text numberOfLines={1} style={styles.episode_text}>
                          {episode.name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.mark_button_container}>
                      {this.state.in_collection &&
                        this.episodeIsWatched(episode.id) && (
                          <TouchableOpacity
                            style={styles.mark_button_watched}
                            onPress={() => {
                              this.props.episodeNotSeen({
                                id: episode.id,
                                tv_show_id: this.props.route.params.item
                                  .tv_show_id,
                              });
                              this.setState({
                                number_of_seen_episodes:
                                  this.state.number_of_seen_episodes - 1,
                              });
                            }}>
                            <Icon name="ios-checkmark" size={35} color="#000" />
                          </TouchableOpacity>
                        )}
                      {this.state.in_collection &&
                        !this.episodeIsWatched(episode.id) && (
                          <TouchableOpacity
                            style={styles.mark_button_not_watched}
                            onPress={() => {
                              this.props.episodeSeen({
                                id: episode.id,
                                tv_show_id: this.props.route.params.item
                                  .tv_show_id,
                              });
                              this.setState({
                                number_of_seen_episodes:
                                  this.state.number_of_seen_episodes + 1,
                              });
                            }}>
                            <Icon name="ios-checkmark" size={35} color="#000" />
                          </TouchableOpacity>
                        )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1, // maybe useless
    flexDirection: 'row', // maybe useless
    flexWrap: 'wrap', // maybe useless
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  loading_icon: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollview_container: {
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  backdrop_image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  box: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 22,
    backgroundColor: '#7c4dff',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    overflow: 'hidden',
    color: '#fff',
  },
  mark_all_as_seen_button: {
    padding: 10,
    backgroundColor: '#40c4ff',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mark_all_as_not_seen_button: {
    padding: 10,
    backgroundColor: '#aaa',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  episode_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  episode_start_container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  episode_number_container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  episode_number: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  episode_text_container: {
    marginHorizontal: 10,
    flex: 1,
  },
  episode_text: {
    fontSize: 15,
  },
  mark_button_container: {},
  mark_button_not_watched: {
    paddingHorizontal: 12,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  mark_button_watched: {
    paddingHorizontal: 12,
    backgroundColor: '#ff9100',
    borderRadius: 20,
  },
  mark_all_button_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mark_all_button_icon: {
    marginRight: 10,
  },
  mark_all_button_text: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

function mapStateToProps(state) {
  return {
    collection: sTvShowGetUserShows(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    episodeSeen: function(episode) {
      dispatch(episodeSeen(episode));
    },
    episodeNotSeen: function(episode) {
      dispatch(episodeNotSeen(episode));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TvShowSeasonPage);
