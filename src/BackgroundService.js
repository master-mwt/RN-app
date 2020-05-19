import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import FirestoreDB from 'utils/FirestoreDB';
import {userLogin, userLogout} from './actions';

const firebaseConfig = {
  apiKey: 'AIzaSyCkcPVmcmzii-CyZ2hYGRrby0boGu8UKns',
  authDomain: 'react-native-app-2dc70.firebaseapp.com',
  databaseURL: 'https://react-native-app-2dc70.firebaseio.com',
  projectId: 'react-native-app-2dc70',
  storageBucket: 'react-native-app-2dc70.appspot.com',
  messagingSenderId: '323114133860',
  appId: '1:323114133860:web:cb56fc811b3a95021cb271',
  measurementId: 'G-JD3MBZF6GL',
};

class BackgroundService extends Component {
  constructor(props) {
    super(props);
    console.log('Backgroundservice constructor()');
    /**
     * Firebase service initialization
     */
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Setup FirestoreDB
    let db = firebase.firestore();
    FirestoreDB.setDB(db);
  }

  componentDidMount() {
    console.log('Backgroundservice componentDidMount()');
    // Login/logout handling
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.userLogin(user);
      } else {
        this.props.userLogout();
      }
    });
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
