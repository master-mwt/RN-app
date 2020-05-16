import React, {Component} from 'react';
import * as RNFS from 'react-native-fs';
import {Text, SafeAreaView, Platform, PermissionsAndroid} from 'react-native';

export default class FileHandlePageTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'si va',
      content: '',
    };
  }

  componentDidMount() {
    let path =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath + '/file.json'
        : RNFS.ExternalStorageDirectoryPath + '/react-native-app/file.json';

    console.log('File path: ' + path);

    if (Platform.OS !== 'ios') {
      this.requestStoragePermission().then(r => {
        this.fileHandling(path);
      });
    } else {
      this.fileHandling(path);
    }
  }

  fileHandling(path) {
    if (Platform.OS !== 'ios') {
      RNFS.exists(RNFS.ExternalStorageDirectoryPath + '/react-native-app').then(
        exists => {
          if (!exists) {
            RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/react-native-app')
              .then(r => {
                console.log('directory created');
                this.writeFile(path);
              })
              .catch(r => {
                console.log('create error directory');
              });
          } else {
            this.writeFile(path);
          }
        },
      );
    } else {
      this.writeFile(path);
    }
  }

  writeFile(path) {
    RNFS.unlink(path)
      .then(r => console.log('unlink file'))
      .catch(r => console.log('unlink file error'));

    RNFS.writeFile(path, JSON.stringify(this.state), 'utf8')
      .then(success => {
        console.log('write successful');
        this.readFile(path);
      })
      .catch(error => {
        console.log('write error');
      });
  }

  readFile(path) {
    RNFS.readFile(path, 'utf8')
      .then(res => {
        console.log('content: ' + res);
        this.setState({
          content: res,
        });
      })
      .catch(error => {
        console.log('read error');
      });
  }

  requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write Permission',
          message:
            'This App needs write access of memory ' +
            'so you can backup your data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can backup your data');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.state.content}</Text>
      </SafeAreaView>
    );
  }
}
