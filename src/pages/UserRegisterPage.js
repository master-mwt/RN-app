import React, {Component} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

class UserRegisterPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <View>
          <Text>register page</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserRegisterPage;
