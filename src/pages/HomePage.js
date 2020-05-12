import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {sLoadedTvShow} from '../reducers/AppReducer';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTvShowDetails} from '../actions';

export default function() {
  const tvshow = useSelector(sLoadedTvShow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTvShowDetails());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card_container}>
        <TouchableOpacity style={styles.card}>
          <Image
            style={styles.card_image}
            source={{uri: 'https://reactjs.org/logo-og.png'}}
          />
          <View style={styles.card_text_container}>
            <Text numberOfLines={2} style={styles.card_text}>
              hello world string string string str string
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card_container: {
    width: '33,3333%',
    padding: 10,
  },
  card: {
    backgroundColor: '#888888',
    padding: 3,
    borderRadius: 5,
  },
  card_image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  card_text_container: {
    padding: 3,
  },
  card_text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
