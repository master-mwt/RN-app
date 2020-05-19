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
  FlatList,
} from 'react-native';
import * as API from '../api/Api';
import Icon from 'react-native-vector-icons/Ionicons';
import {sTvShowGetUserShows} from '../reducers/TvShowReducer';
import {
  addShowToCollection,
  episodeNotSeen,
  episodeSeen,
  removeShowFromCollection,
} from '../actions';
import {connect} from 'react-redux';

class TvShowDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tv_show: null,
      in_collection: false,
      total_number_of_episodes: 0,
      number_of_seen_episodes: 0,
      add_button_text: 'add to collection',
      remove_button_text: 'remove from collection',
      mark_all_as_seen_button_text: 'mark all as seen',
      mark_all_as_not_seen_button_text: 'mark all as not seen',
    };
  }

  componentDidMount() {
    API.getTvShowDetails(this.props.route.params.item.id).then(res => {
      for (let i of this.props.collection) {
        if (i.id === res.id) {
          this.setState({
            in_collection: true,
            total_number_of_episodes: res.number_of_episodes,
            number_of_seen_episodes: i.seen_episodes.length,
          });
        }
      }
      this.setState({
        tv_show: res,
      });
      console.log(this.state.tv_show);
    });
  }

  markAllAsSeen() {
    let success = true;
    for (let i of this.props.collection) {
      if (i.id === this.props.route.params.item.id) {
        this.state.tv_show.seasons.map((season, key) => {
          API.getTvShowSeason(
            this.props.route.params.item.id,
            season.season_number,
          )
            .then(res => {
              res.episodes.map((episode, key) => {
                if (!i.seen_episodes.includes(episode.id)) {
                  this.props.episodeSeen({
                    id: episode.id,
                    tv_show_id: this.props.route.params.item.id,
                  });
                }
              });
            })
            .catch(() => {
              console.log('error in markAllAsSeen');
              success = false;
            });
        });
      }
    }
    if (success) {
      this.setState({
        number_of_seen_episodes: this.state.total_number_of_episodes,
      });
    }
  }

  markAllAsNotSeen() {
    let success = true;
    for (let i of this.props.collection) {
      if (i.id === this.props.route.params.item.id) {
        this.state.tv_show.seasons.map((season, key) => {
          API.getTvShowSeason(
            this.props.route.params.item.id,
            season.season_number,
          )
            .then(res => {
              res.episodes.map((episode, key) => {
                if (i.seen_episodes.includes(episode.id)) {
                  this.props.episodeNotSeen({
                    id: episode.id,
                    tv_show_id: this.props.route.params.item.id,
                  });
                }
              });
            })
            .catch(error => {
              console.log('error in markAllAsNotSeen');
              console.log(error);
              success = false;
            });
        });
      }
    }
    if (success) {
      this.setState({
        number_of_seen_episodes: 0,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        {!this.state.tv_show && (
          <ActivityIndicator
            style={styles.loading_icon}
            size="large"
            color="#000"
          />
        )}
        {this.state.tv_show && (
          <ScrollView
            style={styles.scrollview_container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.backdrop_image_container}>
              <Image
                style={styles.backdrop_image}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${
                    this.state.tv_show.backdrop_path
                  }`,
                }}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.title}>{this.state.tv_show.name}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.overview}>{this.state.tv_show.overview}</Text>
            </View>
            <View style={styles.social_container}>
              <View style={styles.social_container_col}>
                <Icon name="ios-star-outline" color="#000" size={35} />
                <Text style={styles.social_text}>
                  {this.state.tv_show.vote_average}
                </Text>
              </View>
              <View style={styles.social_container_col}>
                <Icon name="ios-eye" color="#000" size={35} />
                <Text style={styles.social_text}>
                  {this.state.tv_show.vote_count}
                </Text>
              </View>
              <View style={styles.social_container_col}>
                <Icon name="ios-trending-up" color="#000" size={35} />
                <Text style={styles.social_text}>
                  {Math.round(this.state.tv_show.popularity, 1) + ' %'}
                </Text>
              </View>
            </View>
            <View style={styles.add_button_container}>
              {!this.state.in_collection && (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({in_collection: true});
                    this.props.addShowToCollection({
                      id: this.state.tv_show.id,
                      poster_path: this.state.tv_show.poster_path,
                      name: this.state.tv_show.name,
                      seen_episodes: [],
                    });
                  }}
                  style={styles.add_button}>
                  <Icon
                    name="ios-add-circle-outline"
                    size={20}
                    color="#000"
                    style={styles.add_button_icon}
                  />
                  <Text style={styles.add_button_text}>
                    {this.state.add_button_text}
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.in_collection && (
                <TouchableOpacity
                  style={styles.remove_button}
                  onPress={() => {
                    this.setState({in_collection: false});
                    this.props.removeShowFromCollection({
                      id: this.state.tv_show.id,
                    });
                  }}>
                  <Icon
                    name="ios-remove-circle-outline"
                    size={20}
                    color="#000"
                    style={styles.add_button_icon}
                  />
                  <Text style={styles.add_button_text}>
                    {this.state.remove_button_text}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.add_button_container}>
              {this.state.in_collection &&
                this.state.total_number_of_episodes !==
                  this.state.number_of_seen_episodes && (
                  <TouchableOpacity
                    style={styles.mark_all_as_seen_button}
                    onPress={() => {
                      this.markAllAsSeen();
                    }}>
                    <Icon
                      name="ios-checkmark-circle-outline"
                      size={20}
                      color="#000"
                      style={styles.add_button_icon}
                    />
                    <Text style={styles.add_button_text}>
                      {this.state.mark_all_as_seen_button_text}
                    </Text>
                  </TouchableOpacity>
                )}
            </View>

            <View style={styles.add_button_container}>
              {this.state.in_collection &&
                this.state.number_of_seen_episodes !== 0 && (
                  <TouchableOpacity
                    style={styles.mark_all_as_not_seen_button}
                    onPress={() => {
                      this.markAllAsNotSeen();
                    }}>
                    <Icon
                      name="ios-close-circle-outline"
                      size={20}
                      color="#000"
                      style={styles.add_button_icon}
                    />
                    <Text style={styles.add_button_text}>
                      {this.state.mark_all_as_not_seen_button_text}
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
            {this.state.tv_show.last_episode_to_air && (
              <View>
                <View style={styles.box}>
                  <Text style={styles.section_title}>Last Episode</Text>
                </View>
                <View style={styles.episode_container}>
                  <View>
                    <Text style={styles.episode_number}>
                      {this.state.tv_show.last_episode_to_air.episode_number}x
                      {this.state.tv_show.last_episode_to_air.season_number}
                    </Text>
                  </View>
                  <View style={styles.episode_text_container}>
                    <Text numberOfLines={1} style={styles.episode_text}>
                      {this.state.tv_show.last_episode_to_air.name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {this.state.tv_show.seasons.length !== 0 && (
              <View>
                <View style={styles.box}>
                  <Text style={styles.section_title}>Seasons</Text>
                </View>
                <FlatList
                  data={this.state.tv_show.seasons}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => {
                        this.props.navigation.navigate('tv_show_season', {
                          item: {
                            tv_show_id: this.state.tv_show.id,
                            season_number: item.season_number,
                          },
                        });
                      }}>
                      <Image
                        style={styles.card_image}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500/${
                            item.poster_path
                          }`,
                        }}
                      />
                      <View style={styles.card_text_container}>
                        <Text numberOfLines={1} style={styles.card_text}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.season_number.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </ScrollView>
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
    paddingVertical: 10,
  },
  loading_icon: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollview_container: {
    height: '100%',
  },
  /* container: {
    flex: 1,
    paddingHorizontal: 10,
  }, */
  backdrop_image_container: {
    paddingHorizontal: 10,
  },
  backdrop_image: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  social_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  social_container_col: {
    flexDirection: 'column', // maybe useful
    alignItems: 'center',
    paddingVertical: 10,
  },
  social_text: {
    fontSize: 18,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    //borderRadius: 5,
    padding: 5,
    //overflow: 'hidden',
    color: '#000',
  },
  box: {
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 22,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    //borderRadius: 5,
    padding: 5,
    //overflow: 'hidden',
    color: '#000',
  },
  section_title: {
    fontSize: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    //borderRadius: 5,
    padding: 5,
    //overflow: 'hidden',
    color: '#000',
  },
  overview: {
    fontSize: 15,
    backgroundColor: '#fff',
    textAlign: 'left',
    //borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
    color: '#000',
  },
  add_button_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  add_button: {
    padding: 10,
    backgroundColor: '#69f0ae',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  remove_button: {
    padding: 10,
    backgroundColor: '#ff5252',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  add_button_text: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  add_button_icon: {
    marginRight: 10,
  },
  card: {
    backgroundColor: '#ccc',
    padding: 3,
    marginHorizontal: 2,
    marginVertical: 1,
    width: 130,
    borderRadius: 5,
  },
  card_image: {
    width: '100%', // maybe useless
    height: 170,
    borderRadius: 5,
  },
  card_text_container: {
    padding: 3,
  },
  card_text: {
    textAlign: 'center',
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  episode_container: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  episode_number: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 5,
    backgroundColor: '#aaa',
    overflow: 'hidden',
  },
  episode_text_container: {
    flex: 1,
  },
  episode_text: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    collection: sTvShowGetUserShows(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addShowToCollection: function(show) {
      dispatch(addShowToCollection(show));
    },
    removeShowFromCollection: function(show) {
      dispatch(removeShowFromCollection(show));
    },
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
)(TvShowDetailsPage);
