import React, {Component} from 'react';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FirestoreDB from './utils/FirestoreDB';
import {userLogin, userLogout} from './actions';

class BackgroundService extends Component {
  constructor(props) {
    super(props);
    // Setup FirestoreDB
    let db = firestore();
    FirestoreDB.setDB(db);
  }

  componentDidMount() {
    // Login/logout handling listener
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.userLogin(user);
      } else {
        this.props.userLogout();
      }
    });
    /* DEBUG */
    FirestoreDB.getData('user@gmail.com')
      .then(data => {
        console.log('data from db: ');
        console.log(data);
      })
      .catch(() => {
        console.log('error reading data from db');
      });
    /* END DEBUG */
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: function(user) {
      dispatch(userLogin(user));
    },
    userLogout: function() {
      dispatch(userLogout());
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(BackgroundService);
