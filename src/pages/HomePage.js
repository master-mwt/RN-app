import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {sLoadedPopularsTvShows} from '../reducers/AppReducer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPopularTvShows} from '../actions';

export default function() {
  const popularTvShows = useSelector(sLoadedPopularsTvShows);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularTvShows());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={popularTvShows.results}
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
});
