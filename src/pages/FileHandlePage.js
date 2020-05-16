import React, {Component} from 'react';
import * as RNFS from 'react-native-fs';
import {Text, SafeAreaView, Platform} from 'react-native';

export default class FileHandlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'si va',
    };
  }

  componentDidMount() {
    let path =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath + '/file.txt'
        : RNFS.ExternalDirectoryPath + '/file.txt';
    console.log('File path: ' + path);
    RNFS.unlink(path)
      .then(r => console.log('unlink file'))
      .catch(r => console.log('unlink file error'));
    this.writeFile(path);
  }

  writeFile(path) {
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
      .then(content => {
        console.log('content: ' + content);
      })
      .catch(error => {
        console.log('read error');
      });
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Scrittura e la lettura di un file nella console</Text>
      </SafeAreaView>
    );
  }
}
