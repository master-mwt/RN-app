import React, {Component} from 'react';
import * as RNFS from 'react-native-fs';
import {Text, View, SafeAreaView, Platform, Button} from 'react-native';
import {sTvShowGetUserShows} from '../reducers/TvShowReducer';
import {connect} from 'react-redux';
import {refreshCollection} from '../actions';

class FileHandlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    this.path =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath + '/file.json'
        : RNFS.ExternalDirectoryPath + '/file.json';
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
        console.log('write successful');
        this.setState({content: 'JSON exported'});
      })
      .catch(error => {
        console.log('write error');
        this.setState({content: 'write error'});
      });
  }

  readFile(path) {
    RNFS.readFile(path, 'utf8')
      .then(res => {
        console.log('content: ' + res);
        this.setState({
          content: res,
        });

        let json = JSON.parse(res);
        console.log('parsed JSON: ');
        console.log(json.shows);
        this.props.refreshCollection(json.shows);
      })
      .catch(error => {
        console.log('read error');
        this.setState({content: 'read error'});
      });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Text>{this.state.content}</Text>
        <View style={{marginVertical: 10}}>
          <Button
            onPress={() => {
              this.backupFile();
            }}
            title="Backup to JSON"
            color="grey"
          />
        </View>
        <View>
          <Button
            onPress={() => {
              this.readFile(this.path);
            }}
            title="Restore from JSON"
            color="grey"
          />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    collection: sTvShowGetUserShows(state),
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
)(FileHandlePage);
