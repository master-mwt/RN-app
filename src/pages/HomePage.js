import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, ActivityIndicator} from 'react-native';

export default class HomePage extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
        <ActivityIndicator size={'large'} color={'purple'} />
      </SafeAreaView>
    );
  }
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
