import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class TvShowDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/*stampare l'oggetto e magari fare il run della query*/}
        <Text style={{fontSize: 30}}>{this.props.route.params.item.id}</Text>
        <Text style={{fontSize: 30}}>{this.props.route.params.item.name}</Text>
      </View>
    );
  }
}
