import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

const Image = styled.img`
  width: 100%;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity .5s ease-in;

  ${props => props.isAvatar && css`
    border-radius: 50%;
    height: 100%;
  `}
`;

export default class Lazyload extends PureComponent {

  state = {
    show: false
  }

  handleImageLoaded = () => {
    this.setState({show: true});
  }
  
  render() {
    return (
      <Image src={this.props.src} 
        {...this.props}
        onLoad={this.handleImageLoaded}
        show={this.state.show} />
    )
  }
  
}