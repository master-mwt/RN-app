import React, {Component} from 'react';
import axios from 'axios';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class HomeNewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      data: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const {page} = this.state;
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=609fbad41366e27a4f7a58d8d1760a3b&language=en-US&page=${page}`;
    this.setState({loading: true});
    axios
      .get(url)
      .then(res => res.data)
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
        <FlatList
          data={this.state.data}
          style={styles.flat_list}
          numColumns={3}
          renderItem={({item}) => (
            <View style={styles.card_container}>
              <TouchableOpacity style={styles.card}>
                <Image
                  style={styles.card_image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // maybe useless
    flexDirection: 'row', // maybe useless
    flexWrap: 'wrap', // maybe useless
    backgroundColor: '#ccc',
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
