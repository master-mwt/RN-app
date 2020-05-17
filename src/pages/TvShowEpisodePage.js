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
import {sTvShowGetUserShows} from '../reducers/TvShowReducer';
import {episodeNotSeen, episodeSeen} from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

class TvShowEpisodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tv_show_in_collection: false,
      tv_show_watched_episode: false,
      tv_show_episode: null,
      mark_as_seen_button_text: 'mark as seen',
      mark_as_not_seen_button_text: 'mark as not seen',
    };
  }

  componentDidMount() {
    API.getTvShowEpisode(
      this.props.route.params.item.tv_show_id,
      this.props.route.params.item.season_number,
      this.props.route.params.item.episode_number,
    ).then(res => {
      for (let i of this.props.collection) {
        if (i.id === this.props.route.params.item.tv_show_id) {
          this.setState({
            tv_show_in_collection: true,
          });

          for (let j of i.seen_episodes) {
            if (j === res.id) {
              this.setState({
                tv_show_watched_episode: true,
              });
            }
          }
        }
      }
      this.setState({
        tv_show_episode: res,
      });
      console.log(this.state.tv_show_episode);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        {!this.state.tv_show_episode && (
          <ActivityIndicator
            style={styles.loading_icon}
            size="large"
            color="#000"
          />
        )}
        {this.state.tv_show_episode && (
          <View style={styles.container}>
            <ScrollView style={styles.scrollview_container}>
              <View style={styles.box}>
                <Image
                  style={styles.backdrop_image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${
                      this.state.tv_show_episode.still_path
                    }`,
                  }}
                />
              </View>

              <View style={styles.box}>
                <Text style={styles.title}>
                  {this.state.tv_show_episode.name}
                </Text>
              </View>

              <View style={styles.mark_button_container}>
                {this.state.tv_show_in_collection &&
                  !this.state.tv_show_watched_episode && (
                    <TouchableOpacity
                      style={styles.mark_button_as_seen}
                      onPress={() => {
                        this.setState({tv_show_watched_episode: true});
                        this.props.episodeSeen({
                          id: this.state.tv_show_episode.id,
                          tv_show_id: this.props.route.params.item.tv_show_id,
                        });
                      }}>
                      <Icon
                        name="ios-checkmark-circle-outline"
                        size={20}
                        color="#000"
                        style={styles.mark_button_icon}
                      />
                      <Text style={styles.mark_button_text}>
                        {this.state.mark_as_seen_button_text}
                      </Text>
                    </TouchableOpacity>
                  )}
                {this.state.tv_show_in_collection &&
                  this.state.tv_show_watched_episode && (
                    <TouchableOpacity
                      style={styles.mark_button_as_not_seen}
                      onPress={() => {
                        this.setState({tv_show_watched_episode: false});
                        this.props.episodeNotSeen({
                          id: this.state.tv_show_episode.id,
                          tv_show_id: this.props.route.params.item.tv_show_id,
                        });
                      }}>
                      <Icon
                        name="ios-close-circle-outline"
                        size={20}
                        color="#000"
                        style={styles.mark_button_icon}
                      />
                      <Text style={styles.mark_button_text}>
                        {this.state.mark_as_not_seen_button_text}
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>

              <View style={styles.box}>
                <Text>{this.state.tv_show_episode.season_number}</Text>
              </View>
              <View style={styles.box}>
                <Text>{this.state.tv_show_episode.episode_number}</Text>
              </View>
              <View style={styles.box}>
                <Text>{this.state.tv_show_episode.air_date}</Text>
              </View>
              <View style={styles.box}>
                <Text>{this.state.tv_show_episode.vote_average}</Text>
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
  add_button: {
    padding: 10,
    backgroundColor: '#4fb',
    borderRadius: 5,
    marginBottom: 5,
  },
  add_button_text: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  mark_button_as_not_seen: {
    padding: 10,
    backgroundColor: '#aaa',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mark_button_as_seen: {
    padding: 10,
    backgroundColor: '#40c4ff',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mark_button_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mark_button_icon: {
    marginRight: 10,
  },
  mark_button_text: {
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
)(TvShowEpisodePage);
