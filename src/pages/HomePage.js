import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {sTvShowsGetPopular} from '../reducers/TvShowReducer';
import {useDispatch, useSelector} from 'react-redux';
import {tvShowsGetPopularFetch} from '../actions';

export default function() {
  const tv_shows_popular = useSelector(sTvShowsGetPopular);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tvShowsGetPopularFetch());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {!tv_shows_popular && (
        <ActivityIndicator
          style={styles.loading_icon}
          size="large"
          color="#000"
        />
      )}
      {tv_shows_popular && (
        <FlatList
          data={tv_shows_popular.results}
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
          onEndReached={() => console.log('end reached')}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
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
