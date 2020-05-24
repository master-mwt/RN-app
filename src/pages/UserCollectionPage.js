import React, {Component} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {sTvShowGetUserShows} from '../reducers/TvShowReducer';
import {connect} from 'react-redux';

class UserCollectionPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.collection.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#009387" />
        {!this.props.collection ||
          (this.props.collection.length === 0 && (
            <View style={styles.empty_collection_text_container}>
              <Text style={styles.empty_collection_text}>Empty Collection</Text>
            </View>
          ))}
        {this.props.collection && this.props.collection.length !== 0 && (
          <FlatList
            data={this.props.collection}
            style={styles.flat_list}
            numColumns={3}
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
                  {item.poster_path && (
                    <Image
                      style={styles.card_image}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${
                          item.poster_path
                        }`,
                      }}
                    />
                  )}
                  {!item.poster_path && (
                    <Image
                      style={styles.card_image}
                      source={require('../../imgs/no_content.jpg')}
                    />
                  )}
                  <View style={styles.card_text_container}>
                    <Text numberOfLines={1} style={styles.card_text}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // maybe useless
    flexDirection: 'row', // maybe useless
    flexWrap: 'wrap', // maybe useless
    backgroundColor: '#fff',
  },
  flat_list: {
    height: '100%',
  },
  card_container: {
    width: '33.3333%',
    padding: 2,
  },
  card: {
    backgroundColor: '#ccc',
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
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  loading_icon: {
    flex: 1,
    justifyContent: 'center',
  },
  empty_collection_text_container: {
    flex: 1,
    justifyContent: 'center',
  },
  empty_collection_text: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    collection: sTvShowGetUserShows(state),
  };
}

export default connect(
  mapStateToProps,
  null,
)(UserCollectionPage);
