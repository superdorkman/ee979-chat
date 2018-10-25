import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatIpt from './chat-ipt/ChatIpt';
import ChatWin from './chat-win/ChatWin';
import axios from 'axios';
import { API_URL } from '../../constants/url';

class ChatWrap extends Component {

  state = {
    messages: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sn && this.props.sn !== nextProps.sn) {
      this.setState({ messages: [] });
      this.getDetail(nextProps.sn);
    }

    if (nextProps.message) {
      this.handleNewMsg(nextProps);
    }
  }
  
  handleNewMsg({message, sn}) {
    const parsedMsg = JSON.parse(message);
    if (!sn || parsedMsg.from !== sn) return;
    let { messages } = this.state;
    messages.push(parsedMsg);

    this.setState({ messages });
  } 

  getDetail(sn) {
    const body = { sn };
    axios.post(`${API_URL}/Chats/history`, body)
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            this.setState({
              messages: data,
            })
          }
        }
      ).catch(err => {});
  }

  onSending = (msg) => {
    let messages = [...this.state.messages, {body: msg}];
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    const { sn } = this.props;

    return (
      <div style={styles.container}>
        <ChatWin messages={messages} targetSn={sn} />
        { sn && <ChatIpt targetSn={sn} onSending={this.onSending}/> }
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex', 
    flexDirection: 'column', 
    flex: 1
  }
}

const mapStateToProps = (state) => ({
  message: state.setting.message
});

export default connect(mapStateToProps)(ChatWrap);