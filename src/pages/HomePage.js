import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {sLoadedTvShow} from '../reducers/AppReducer';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTvShowDetails} from '../actions';

export default function() {
  const tvshow = useSelector(sLoadedTvShow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTvShowDetails());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Text>{tvshow.first_air_date}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'purple',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
