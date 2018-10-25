import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClickOutside extends Component {

  static propTypes = {
    onClickOutside: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true)
  }

  handle = e => {
    const { onClickOutside } = this.props;
    const el = this.container;
    if (el && !el.contains(e.target)) onClickOutside(e);
  }

  render() {
    const { children, onClickOutside, ...props } = this.props
    return <div {...props} ref={ref => this.container = ref}>{children}</div>
  }
}