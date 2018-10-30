import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, LogoWrap, Chats, ChatItem } from './Sidebar.styled';
import logo from '../../assets/images/logo.png';
import { API_URL } from '../../constants/url';
import getChatTime from '../../utils/chatTime';
import LayoutLoading from '../libs/loading/LayoutLoading';
const { ipcRenderer } = window.require('electron');

export class Sidebar extends Component {

  state = {
    chats: null,
    curChatSn: null,
    updateMsg: '',
  }

  componentWillMount() {
    this.getList();
  }

  componentDidMount() {
    ipcRenderer.on('update', (event, text) => {
      console.log(text);
      // this.setState({ updateMsg: text });
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      ipcRenderer.send('message:arrive', nextProps.message);
      this.handleNewMessage(nextProps.message);
    }
  }

  handleNewMessage(message) {
    let { chats, curChatSn } = this.state;
    const { from, body } = JSON.parse(message);
    const item = chats.find(c => c.from === from);

    if (!item) {
      chats = [{
        body: JSON.stringify(body), flag: 1, from
      }, ...chats];
    } else {
      item.body = JSON.stringify(body);
      if (!curChatSn) {
        item.flag = item.flag + 1;
      }
      const itemIdx = chats.findIndex(c => c.from === from);
      if (itemIdx > 0) {
        chats = chats.splice(itemIdx, 1).concat(chats);
      }
    }

    this.setState({ chats });
  }

  getList() {
    const body = {
      page: 1,
      size: 20,
    }
    axios.post(`${API_URL}/Chats/mlist`, body)
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            this.setState({ chats: data });
          }
        }
      ).catch(err => {});
  }

  handleMouseDown = (e) => {
    if (e.button !== 2) return;
  }

  renderChats() {
    const { chats, curChatSn } = this.state;
    if (!chats) {
      return <LayoutLoading type='users' count={9} />;
    }
     
    return chats.map((item, idx) => {
      const { from, body, flag } = item;
      const { msg, created } = JSON.parse(body);
      const id = from.length === 16 ? '用户' : '游客';
      return (
        <ChatItem key={from} active={curChatSn === from} 
          onClick={() => this.handleItemClick(item, idx)}>
          <div className="id">{id}</div>
          <div className="info">
            <h4>{from}</h4>
            <p>{msg}</p>
          </div>

          <div className="time">{getChatTime(created)}</div>
          {!!flag && <div className="badge">{Number(flag)}</div>}
        </ChatItem>
      )
    })
  }

  handleItemClick(item, idx) {
    const { chats } = this.state;
    const chat = chats.find(c => c.imMsgSN === item.imMsgSN);
    chat.flag = false;
    this.setState({ curChatSn: chat.from, chats });
    this.props.selectUser(item);
  }

  render() {
    return (
      <Container onMouseDown={this.handleMouseDown}>
        <LogoWrap>
          <img src={logo} />
          <div>{this.state.updateMsg}</div>
        </LogoWrap>

        <Chats>
          {this.renderChats()}
        </Chats>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.setting.message
});

export default connect(mapStateToProps)(Sidebar);