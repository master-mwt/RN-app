import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
      <SafeAreaView style={styles.main_container}>
        <View style={styles.title_container}>
          <Text style={styles.title}>register</Text>
        </View>
        <View style={styles.register_box}>
          <View style={styles.register_email_container}>
            <TextInput
              style={styles.register_email}
              placeholder={'Email'}
              autoCapitalize={'none'}
              onChangeText={this.handleChangeEmail}
              value={this.state.email}
            />
          </View>
          <View style={styles.register_password_container}>
            <TextInput
              style={styles.register_password}
              placeholder={'Password'}
              autoCapitalize={'none'}
              onChangeText={this.handleChangePassword}
              value={this.state.password}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.register_button_container}>
          <TouchableOpacity
            style={styles.register_button}
            onPress={this.register}>
            <Text style={styles.register_button_text}>Sign Up</Text>
            {this.state.loading && (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={styles.register_button_ai}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.alert_box}>
          <Text style={styles.alert_message}>{this.state.status}</Text>
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
  title_container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  register_box: {
    backgroundColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  register_email_container: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  register_email: {
    fontSize: 15,
  },
  register_password_container: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  register_password: {
    fontSize: 15,
  },
  register_button_container: {
    padding: 10,
  },
  register_button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  register_button_text: {
    fontSize: 20,
    color: '#fff',
  },
  register_button_ai: {
    marginLeft: 10,
  },
  alert_box: {
    marginTop: 10,
  },
  alert_message: {
    fontSize: 15,
    color: '#ff1744',
  },
});

export default UserRegisterPage;
