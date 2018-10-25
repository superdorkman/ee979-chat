import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Ctrls } from './Header.styled';
import svgIcons from '../../assets/icons/icons.svg';

const { ipcRenderer } = window.require('electron');

export class Header extends Component {
  
  handleCtrlClick(type) {
    ipcRenderer.send(`app:${type}`, {});
  }

  render() {
    const { sn } = this.props;

    return (
      <Container onMouseDown={this.handleMouseDown}>
        <span>{sn}</span>
        <Ctrls>
          <li onClick={() => this.handleCtrlClick('extract')}>
            <svg><use xlinkHref={`${svgIcons}#line`}/></svg></li>
          <li className="expand" onClick={() => this.handleCtrlClick('expand')}>
            <svg><use xlinkHref={`${svgIcons}#expand`}/></svg></li>
          <li className="close" onClick={() => this.handleCtrlClick('hide')}>
            <svg><use xlinkHref={`${svgIcons}#close`}/></svg></li>
        </Ctrls>
      </Container>
    )
  }
}

export default connect(null)(Header);