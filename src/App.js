import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { first } from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import YesNo from './components/yes-no';
import Blocks from './components/blocks';
import UpdateModal from './components/update-modal';

firebase.initializeApp({
  apiKey: "AIzaSyBb-Kukq5G5atpIjoHhvW4-NyFYxqymHC0",
  authDomain: "isleesleeping-56a54.firebaseapp.com",
  databaseURL: "https://isleesleeping-56a54.firebaseio.com",
  projectId: "isleesleeping-56a54",
  storageBucket: "isleesleeping-56a54.appspot.com",
  messagingSenderId: "478470186058",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      events: [],
    };

    this.updateSleeping = this.updateSleeping.bind(this);
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    db.collection('events')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        snapshot.docChanges().forEach(({ type, doc }) => {
          if (type === 'added') {
            const event = {
              ...doc.data(),
              timestamp: doc.data().timestamp.toDate(),
            };

            this.setState(state => ({
              events: state.events.concat(event).sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf()),
            }));
          }
        }));
  }

  toggleUpdateModal() {
    this.setState(state => ({ modalOpen: !state.modalOpen }));
  }

  updateSleeping(sleeping) {
    const db = firebase.firestore();
    const timestamp = new Date();

    db
      .collection('events')
      .add({ timestamp, sleeping});
  }

  render() {
    const current = first(this.state.events);

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Blocks events={this.state.events} />

        {current && <YesNo {...current} toggleHandler={this.toggleUpdateModal} />}

        <UpdateModal open={this.state.modalOpen} toggleHandler={this.toggleUpdateModal} updateHandler={this.updateSleeping} />
      </MuiThemeProvider>);
  }
}

export default App;
