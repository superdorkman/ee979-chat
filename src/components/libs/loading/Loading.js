import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { Svg } from './Loading.styled';
import theme from '../../../constants/theme';

class Loading extends Component {

  state = {
    fill: theme.main,
    index: 2
  }

  componentWillMount() {
    let { fill, name } = this.props;
    fill = fill || theme.main;
    let index;
    if (name) {
      index = this.getIndex(name);
    } else {
      index = Math.floor(Math.random() * 8);
    }
    this.setState({fill, index});
  }

  getIndex(name) {
    switch (name) {
      case 'circle':
        return 2;
      default:
        return 2;
    }
  }

  render() {
    let { fill, index } = this.state;

    const loaders = [
      <Svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="0" y="0" width="4" height="7" fill={fill}>
          <animateTransform attributeType="xml"
            attributeName="transform" type="scale"
            values="1,1; 1,3; 1,1"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>

        <rect x="10" y="0" width="4" height="7" fill={fill}>
          <animateTransform attributeType="xml"
            attributeName="transform" type="scale"
            values="1,1; 1,3; 1,1"
            begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="20" y="0" width="4" height="7" fill={fill}>
          <animateTransform attributeType="xml"
            attributeName="transform" type="scale"
            values="1,1; 1,3; 1,1"
            begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </Svg>,
      <Svg width="40px" height="40px" viewBox="0 0 50 50">
        <path fill={fill} d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite" />
        </path>
      </Svg>,
      // 圆圈
      <Svg width="30px" height="30px" viewBox="0 0 50 50">
        <path fill={fill} d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite" />
        </path>
      </Svg>,
      <Svg width="24px" height="24px" viewBox="0 0 24 24">
        <rect fill={fill} x="0" y="0" width="4" height="7">
          <animateTransform attributeType="xml"
            attributeName="transform" type="scale"
            values="1,1; 1,3; 1,1"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>

        <rect fill={fill} x="10" y="0" width="4" height="7">
          <animateTransform attributeType="xml"
            attributeName="transform" type="scale"
            values="1,1; 1,3; 1,1"
            begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="20" y="0" width="4" height="7">
          <animateTransform attributeType="xml"
            attributeName="transform" type="scale"
            values="1,1; 1,3; 1,1"
            begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </Svg>,
      <Svg width="24px" height="30px" viewBox="0 0 24 30">
        <rect fill={fill} x="0" y="0" width="4" height="10">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 0; 0 20; 0 0"
            begin="0" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="10" y="0" width="4" height="10">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="20" y="0" width="4" height="10">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </Svg>,
      <Svg width="24px" height="30px" viewBox="0 0 24 30">
        <rect fill={fill} x="0" y="13" width="4" height="5">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="10" y="13" width="4" height="5">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="20" y="13" width="4" height="5">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </Svg>,
      <Svg width="24px" height="30px" viewBox="0 0 24 30">
        <rect fill={fill} x="0" y="0" width="4" height="20">
          <animate attributeName="opacity" attributeType="XML"
            values="1; .2; 1"
            begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="7" y="0" width="4" height="20">
          <animate attributeName="opacity" attributeType="XML"
            values="1; .2; 1"
            begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="14" y="0" width="4" height="20">
          <animate attributeName="opacity" attributeType="XML"
            values="1; .2; 1"
            begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </Svg>,
      <Svg width="24px" height="30px" viewBox="0 0 24 30">
        <rect fill={fill} x="0" y="10" width="4" height="10" opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="8" y="10" width="4" height="10" opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect fill={fill} x="16" y="10" width="4" height="10" opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </Svg>
    ];

   
    const loader = loaders[index];

    return (
      <ThemeProvider theme={theme}>
        {loader}
      </ThemeProvider>
    )
  }
}

export default Loading;