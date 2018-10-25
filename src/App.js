import React, { Component, Fragment } from 'react';
import ChatWrap from './components/chat-wrap/ChatWrap';
import Header from './components/header/Header';
import Login from './components/login/Login';
import ResizeArea from './components/common/resize-area/ResizeArea';
import Sidebar from './components/sidebar/Sidebar';
import axios from 'axios';
import initMqtt from './services/mqtt';

const {ipcRenderer} = window.require('electron');
const isLoggedIn = ipcRenderer.sendSync('auth:check');

axios.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session && session.id) {
    if (config.url.indexOf('?') > -1) {
      config.url = `${config.url}&access_token=${session.id}`;
    } else {
      config.url = `${config.url}?access_token=${session.id}`;
    }
  }
  return config;
});

class App extends Component {
  state = {
    user: {}
  }

  componentWillMount() {
  }

  componentDidMount() {
    initMqtt();
  }

  _selectUser = (user) => {
    this.setState({ user });
  }

  render() {
    console.log('rendering app')
    const { user } = this.state;

    let app;
    if (isLoggedIn) {
      app = (
        <Fragment>
          <div className="App">
            <Sidebar selectUser={this._selectUser} />
            <div className="main">
              <Header sn={user.from}  />
              <ChatWrap sn={user.from} />
            </div>
          </div>
          <ResizeArea />
        </Fragment>
      )
    } else {
      app = <Login />;
    }

    return app;
  }
}

export default App;
