import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import FirebaseAuth from '../utils/FirebaseAuth';

class UserRegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: '',
      loading: false,
    };

    this.registerSuccess = function() {
      this.setState({
        status: 'Registration completed',
        loading: false,
      });
      this.props.navigation.goBack();
    }.bind(this);

    this.registerError = function(error) {
      this.setState({
        status: error.message,
        loading: false,
      });
    }.bind(this);

    this.handleChangeEmail = function(text) {
      this.setState({
        email: text,
      });
    }.bind(this);

    this.handleChangePassword = function(text) {
      this.setState({
        password: text,
      });
    }.bind(this);

    this.register = function() {
      this.setState({loading: true});
      FirebaseAuth.signUp(this.state.email, this.state.password)
        .then(() => {
          this.registerSuccess();
        })
        .catch(error => {
          this.registerError(error);
        });
    }.bind(this);
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={{alignSelf: 'center'}}>register page</Text>
        </View>
        <View>
          <TextInput
            placeholder={'Email'}
            autoCapitalize={'none'}
            onChangeText={this.handleChangeEmail}
            value={this.state.email}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Password'}
            autoCapitalize={'none'}
            onChangeText={this.handleChangePassword}
            value={this.state.password}
            secureTextEntry
          />
        </View>
        <View>
          <Button title={'Register'} onPress={this.register} />
        </View>
        <View>
          <Text style={{alignSelf: 'center'}}>{this.state.status}</Text>
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
