import React, { Component } from 'react';
import { Wrapper, Svg } from './LayoutLoading.styled';

class LayoutLoading extends Component {

  getLoader(type) {
    switch (type) {
      case 'users':
        return (
          <Svg viewBox="0 0 292 58">
            <rect x="12" y="17" width="32" height="24" rx="2" ry="2" />
            <rect x="56" y="8" width="200" height="18" rx="1" ry="1" />
            <rect x="56" y="32" width="200" height="18" rx="1" ry="1" />
          </Svg>
        );
      case 'goodsNoneScale':
        return (
          <Svg viewBox="0 0 640 180">
            <rect x="10" y="10" width="160" height="160" rx="8" ry="8" />
            <rect x="240" y="12" width="380" height="36" rx="4" ry="4" />
            <rect x="240" y="70" width="280" height="36" rx="4" ry="4" />
            <rect x="240" y="130" width="180" height="36" rx="4" ry="4" />
          </Svg>
        );
      case 'msg':
        return (
          <Svg viewBox="0 0 640 128">
            <rect x="30" y="30" width="40" height="30" rx="2" ry="2" />
            <rect x="80" y="30" width="380" height="30" rx="4" ry="4" />
            <rect x="80" y="70" width="480" height="30" rx="4" ry="4" />
          </Svg>
        );
      case 'role':
        return (
          <Svg viewBox="0 0 640 220">
            {/* <rect x="0" y="0" width="640" height="220" rx="4" ry="4" fill="none" stroke="#d5d5d5" /> */}
            <path d="M0,0 640,0 640,220, 0,220z" fill="none" stroke="#d5d5d5" strokeWidth="2" />
            <circle cx="600" cy="40" r="16" />
            <circle cx="550" cy="40" r="16" />

            <rect x="70" y="55" width="280" height="30" rx="4" ry="4" />
            <rect x="70" y="95" width="380" height="30" rx="4" ry="4" />
            <rect x="70" y="135" width="180" height="30" rx="4" ry="4" />
          </Svg>
        );
    }
  }

  renderLoader() {
    const { type, count, children } = this.props;
    const layout = type ? this.getLoader(type) : children;

    return Array(count).fill(1).map((item, idx) => <React.Fragment key={idx}>{ layout }</React.Fragment>);
  }

  render() {
    let { style } = this.props;
    
    return (
      <Wrapper style={style}>
        {this.renderLoader()}
      </Wrapper>
    )
  }

}

LayoutLoading.defaultProps = {
  count: 4
}

export default LayoutLoading;