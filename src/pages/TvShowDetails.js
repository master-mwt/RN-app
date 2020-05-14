import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as API from '../api/Api';

export default class TvShowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tvShow: null,
    };
  }

  componentDidMount() {
      API.getTvShowDetail(this.props.route.params.item.id)
          .then((res)=>{
              this.setState({
                  tvShow: res,
              });
          });
  }

    render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>{this.props.route.params.item.id}</Text>
        <Text style={{fontSize: 30}}>{this.props.route.params.item.name}</Text>
          { this.state.tvShow && <Text style={{fontSize: 20}}>status: {this.state.tvShow.status}</Text> }
          { this.state.tvShow && <Text style={{fontSize: 20}}>vote_average: {this.state.tvShow.vote_average}</Text> }
          { this.state.tvShow && <Text style={{fontSize: 20}}>original_language: {this.state.tvShow.original_language}</Text> }
          { this.state.tvShow && <Text style={{fontSize: 20}}>number_of_seasons: {this.state.tvShow.number_of_seasons}</Text> }
          { this.state.tvShow && <Text style={{fontSize: 20}}>number_of_episodes: {this.state.tvShow.number_of_episodes}</Text> }
      </View>
    );
  }
}
