import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Person } from '../icons';
import Lazyload from '../../libs/lazyload/Lazyload';

export class Avatar extends Component {
  static propTypes = {

  }

  render() {
    const { size, src, theme } = this.props;
    const style = {
      ...styles.wrap,
      width: size,
      height: size
    }

    return (
      <div style={style} >
        {src ? (
          <Lazyload src={src} isAvatar={true} />
        ) : <Person theme={theme} />}
      </div>
    )
  }
}

Avatar.defaultProps = {
  size: '6.8vw',
}

const styles = {};

styles.wrap = {
  display: 'inline-block',
  border: '1px solid #ffcf4c',
  borderRadius: '50%',
  overflow: 'hidden'
}


export default Avatar;
