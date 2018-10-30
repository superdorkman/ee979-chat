import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/url';
import { Container, IptWrap, Submit, Top, Ctrls, Bottom, } from './Login.styled';
import Loading from '../libs/loading/Loading';
import logo from '../../assets/images/login-logo.png';
import svgIcons from '../../assets/icons/icons.svg';

const { ipcRenderer } = window.require('electron');

export class Login extends Component {

  state = {
    password: '',
    isSubmitting: false,
    username: '',
  }

  componentWillMount() {
    this.setState({
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    })
  }

  handleIptChange(label, event) {
    this.setState({ [label]: event.target.value });
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  }

  handleLogin = () => {
    const { username, password } = this.state;
    if (!username || !password) return;
    this.setState({ isSubmitting: true });

    const body = {
      name: username,
      password
    };
    axios.post(`${API_URL}/Members/loginx`, body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.session = JSON.stringify(data);
            ipcRenderer.send('auth:login');
          } else if (error) {
            this.setState({ isSubmitting: false });
          }
        }
      ).catch(err => { this.setState({ isSubmitting: false }); });
  }

  handleCtrlClick(type) {
    ipcRenderer.send(`app:${type}`, {});
  }

  render() {
    const { password, username, isSubmitting } = this.state;

    return (
      <Container>
        <Top>
          <img src={logo} />
          <Ctrls>
            <li onClick={() => this.handleCtrlClick('extract')}>
              <svg><use xlinkHref={`${svgIcons}#line`} /></svg></li>
            <li className="close" onClick={() => this.handleCtrlClick('close')}>
              <svg><use xlinkHref={`${svgIcons}#close`} /></svg></li>
          </Ctrls>
        </Top>
        <Bottom>
          <IptWrap>
            <div className="icon"><svg><use xlinkHref={`${svgIcons}#username`} /></svg></div>
            <input value={username} onChange={(e) => this.handleIptChange('username', e)} />
            <span className="line"></span>
          </IptWrap>
          <IptWrap>
            <div className="icon"><svg><use xlinkHref={`${svgIcons}#password`} /></svg></div>
            <input value={password} type="password" 
              onKeyDown={this.handleKeyDown}
              onChange={(e) => this.handleIptChange('password', e)} />
            <span className="line"></span>
          </IptWrap>
          <Submit onClick={this.handleLogin} disabled={isSubmitting}>
            {isSubmitting ? <Loading name="circle" fill="#fff" /> : '登录'}
          </Submit>
        </Bottom>
        
      </Container>
    )
  }
}

export default Login;