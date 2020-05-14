import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as API from '../api/Api';

export default class TvShowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tv_show: null,
    };
  }

  componentDidMount() {
    API.getTvShowDetail(this.props.route.params.item.id).then(res => {
      this.setState({
        tv_show: res,
      });
      console.log(this.state.tv_show);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        {!this.state.tv_show && (
          <ActivityIndicator
            style={styles.loading_icon}
            size="large"
            color="#000"
          />
        )}
        {this.state.tv_show && (
          <View style={styles.container}>
            <View style={styles.box}>
              <Image
                style={styles.backdrop_image}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${
                    this.state.tv_show.backdrop_path
                  }`,
                }}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.title}>{this.state.tv_show.name}</Text>
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.add_button}>
                <Text style={styles.add_button_text}>add to collection</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1, // maybe useless
    flexDirection: 'row', // maybe useless
    flexWrap: 'wrap', // maybe useless
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  loading_icon: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  backdrop_image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  box: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 25,
    backgroundColor: '#ddd',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    overflow: 'hidden',
    color: '#000',
  },
  add_button: {
    padding: 10,
    backgroundColor: '#4fb',
    borderRadius: 5,
  },
  add_button_text: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
