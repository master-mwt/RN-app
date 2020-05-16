import React, {Component} from 'react';
import * as API from '../api/Api';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      data: [],
      text: '',
    };

    this.handleChangeText = function(text) {
      this.setState({
        text: text,
      });
      if (this.state.text.length !== 0) {
        this.setState({loading: true});
        API.searchTvShow(this.state.text)
          .then(res => {
            this.setState({
              data: [...res.results],
              loading: false,
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({loading: false});
          });
      }
    }.bind(this);
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const {page} = this.state;
    if (this.state.text.length !== 0) {
      this.setState({loading: true});
      API.searchTvShow(this.state.text, page)
        .then(res => {
          this.setState({
            data: [...this.state.data, ...res.results],
            loading: false,
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({loading: false});
        });
    }
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.text_input_container}>
          <TextInput
            style={styles.text_input}
            placeholder={'Search'}
            autoCapitalize={'none'}
            onChangeText={this.handleChangeText}
            value={this.state.text}
          />
          {!this.state.text.length === 0 && (
            <View style={styles.empty_search_container}>
              <Text style={styles.empty_search}>Empty search</Text>
            </View>
          )}
        </View>
        <View>
          {this.state.loading && (
            <ActivityIndicator size="large" color="#000" />
          )}
          {this.state.text.length !== 0 && (
            <FlatList
              data={this.state.data}
              style={styles.flat_list}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.card_container}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      this.props.navigation.navigate('tv_show_details', {
                        item: {
                          id: item.id,
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
                </View>
              )}
              keyExtractor={item => item.id}
              onEndReached={() => this.handleLoadMore()}
              onEndReachedThreshold={0.2}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text_input_container: {
    padding: 10,
  },
  text_input: {
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  empty_search_container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  empty_search: {
    color: '#555',
    fontSize: 15,
  },
  flat_list: {
    height: '100%',
  },
  card_container: {
    width: '33.3333%',
    padding: 2,
  },
  card: {
    backgroundColor: '#555',
    padding: 3,
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
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  loading_icon: {
    flex: 1,
    justifyContent: 'center',
  },
});
