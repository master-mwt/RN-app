import React, {Component} from 'react';
import * as RNFS from 'react-native-fs';
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  Alert,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {sTvShowGetUserShows} from '../reducers/TvShowReducer';
import {connect} from 'react-redux';
import {refreshCollection} from '../actions';
import FirebaseAuth from '../utils/FirebaseAuth';
import {sAppUser, sAppUserLogged} from '../reducers/AppReducer';
import * as LocalServer from '../utils/LocalServer';

class UserSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      local_export_info:
        'Export the current status of your collection by pressing the "LOCAL EXPORT" button.\n\nYou can easily access the backup file using a File Manager application.\n\nYou can also move this file between you devices and click on "LOCAL IMPORT" to synchronize your collection',
      remote_export_info:
        'Export the current status of your collection by pressing the "REMOTE EXPORT" button.\n\nThis action will export the content of your collection to the remote application database.\n\nYou can click on "REMOTE IMPORT" to synchronize your collection',
      local_import_info:
        'Import and synchronize your collection by pressing the "LOCAL IMPORT" button.\n\nThis action will rigenerate you collection on the current device from the informations on the backup file.\n\nThe backup file must therefore be present in your app system folder path (depending on your device).',
      remote_import_info:
        'Import and synchronize your collection by pressing the "REMOTE IMPORT" button.\n\nThis action will rigenerate you collection on the current device from the informations on the remote application database.',
    };
  }

  componentDidMount() {
    this.path =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath + '/backup.json'
        : RNFS.ExternalDirectoryPath + '/backup.json';
    console.log('File path: ' + this.path);
  }

  backupFile() {
    RNFS.unlink(this.path)
      .then(r => {
        console.log('unlink file');
      })
      .catch(r => console.log('unlink file error'));
    this.writeFile(this.path);
  }

  writeFile(path) {
    let state = {
      shows: this.props.collection,
    };

    RNFS.writeFile(path, JSON.stringify(state), 'utf8')
      .then(success => {
        this.setState({message: 'Backup exported successfully!'});
        this.renderAlert('SUCCESS');
      })
      .catch(error => {
        this.setState({message: 'Export failure!'});
        this.renderAlert('ERROR');
      });
  }

  readFile(path) {
    RNFS.readFile(path, 'utf8')
      .then(res => {
        this.setState({
          message: 'Backup imported successfully!',
        });
        let json = JSON.parse(res);
        this.renderAlert('SUCCESS');
        this.props.refreshCollection(json.shows);
      })
      .catch(error => {
        this.setState({
          message:
            "Import failure! Maybe the backup file doesn't exist, so first export your backup!",
        });
        this.renderAlert('ERROR');
      });
  }

  renderAlert = title =>
    Alert.alert(title, this.state.message, [{text: 'OK'}], {
      cancelable: false,
    });

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar barStyle="light-content" backgroundColor="#d02860" />
        <ScrollView
          style={styles.scrollview_container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.user_image_container}>
              <Image
                style={styles.user_image}
                source={require('../../imgs/user_profile.png')}
              />
            </View>
            {/* insert login logic and redux user status checks */}
            <View style={styles.user_data_container}>
              {!this.props.logged && (
                <Text style={styles.user_data_text}>guest</Text>
              )}
              {this.props.logged && (
                <Text style={styles.user_data_text}>
                  {this.props.user.email}
                </Text>
              )}
            </View>

            {!this.props.logged && (
              <View>
                <View style={styles.login_register_button_container}>
                  <TouchableOpacity
                    style={styles.login_button}
                    onPress={() => {
                      this.props.navigation.navigate('login');
                    }}>
                    <Text style={styles.login_button_text}>login</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.login_register_button_container}>
                  <TouchableOpacity
                    style={styles.login_button}
                    onPress={() => {
                      this.props.navigation.navigate('register');
                    }}>
                    <Text style={styles.login_button_text}>register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {this.props.logged && (
              <View style={styles.login_register_button_container}>
                <TouchableOpacity
                  style={styles.login_button}
                  onPress={() => {
                    FirebaseAuth.signOut()
                      .then(() => {
                        console.log('sign out completed');
                      })
                      .catch(() => {
                        console.log('error in sign out');
                      });
                  }}>
                  <Text style={styles.login_button_text}>logout</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.separator} />

            <View style={styles.backup_info_section}>
              <Text style={styles.backup_info_section_text}>LOCAL ACTIONS</Text>
            </View>

            <View style={styles.backup_info_container}>
              <Text style={styles.backup_info_text}>
                {this.state.local_export_info}
              </Text>
            </View>
            <View style={styles.backup_button_container}>
              <TouchableOpacity
                style={styles.backup_button}
                onPress={() => {
                  this.backupFile();
                }}>
                <Text style={styles.backup_button_text}>local export</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.backup_info_container}>
                <Text style={styles.backup_info_text}>
                  {this.state.local_import_info}
                </Text>
              </View>
              <View style={styles.backup_button_container}>
                <TouchableOpacity
                  style={styles.backup_button}
                  onPress={() => {
                    this.readFile(this.path);
                  }}>
                  <Text style={styles.backup_button_text}>local import</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.backup_info_section}>
                <Text style={styles.backup_info_section_text}>
                  REMOTE ACTIONS (require login)
                </Text>
              </View>
              <View style={styles.backup_info_container}>
                <Text style={styles.backup_info_text}>
                  {this.state.remote_export_info}
                </Text>
              </View>
              <View style={styles.backup_button_container}>
                <TouchableOpacity
                  style={
                    !this.props.logged
                      ? styles.backup_button_disabled
                      : styles.backup_button
                  }
                  disabled={!this.props.logged}
                  onPress={() => {
                    LocalServer.putData(
                      this.props.user.email,
                      this.props.collection,
                    )
                      .then(data => {
                        this.setState({
                          message: 'Backup exported successfully!',
                        });
                        this.renderAlert('SUCCESS');
                      })
                      .catch(error => {
                        this.setState({message: 'Export failure!'});
                        this.renderAlert('ERROR');
                      });
                  }}>
                  <Text style={styles.backup_button_text}>remote export</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.backup_info_container}>
                <Text style={styles.backup_info_text}>
                  {this.state.remote_import_info}
                </Text>
              </View>
              <View style={styles.backup_button_container}>
                <TouchableOpacity
                  style={
                    !this.props.logged
                      ? styles.backup_button_disabled
                      : styles.backup_button
                  }
                  disabled={!this.props.logged}
                  onPress={() => {
                    LocalServer.getData(this.props.user.email)
                      .then(data => {
                        if (data) {
                          this.setState({
                            message: 'Backup imported successfully!',
                          });
                          this.props.refreshCollection(data);
                          this.renderAlert('SUCCESS');
                        }
                      })
                      .catch(error => {
                        this.setState({
                          message: 'Import failure!',
                        });
                        this.renderAlert('ERROR');
                      });
                  }}>
                  <Text style={styles.backup_button_text}>remote import</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  scrollview_container: {
    height: '100%',
  },
  user_image_container: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#ddd',
  },
  user_image: {
    width: 100,
    height: 100,
  },
  user_data_container: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#bbb',
    padding: 10,
  },
  user_data_text: {
    fontSize: 20,
  },
  login_register_button_container: {
    padding: 10,
  },
  login_button: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  login_button_text: {
    fontSize: 15,
    color: '#fff',
    textTransform: 'uppercase',
  },
  register_button: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  register_button_text: {
    fontSize: 15,
    color: '#fff',
    textTransform: 'uppercase',
  },
  separator: {
    padding: 10,
  },
  backup_button_container: {
    padding: 10,
  },
  backup_button: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  backup_button_disabled: {
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  backup_button_text: {
    fontSize: 15,
    color: '#fff',
    textTransform: 'uppercase',
  },
  backup_info_container: {
    backgroundColor: '#ddd',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  backup_info_text: {
    textAlign: 'justify',
    fontSize: 15,
  },
  backup_info_section: {
    backgroundColor: '#34495e',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  backup_info_section_text: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});

function mapStateToProps(state) {
  return {
    collection: sTvShowGetUserShows(state),
    logged: sAppUserLogged(state),
    user: sAppUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refreshCollection: function(shows) {
      dispatch(refreshCollection(shows));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSettingsPage);
