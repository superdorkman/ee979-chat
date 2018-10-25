import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, List } from './MsgTemplates.styled';

import templates from './templates';

export class MsgTemplates extends Component {

  state = {
  }

  renderList() {
    return templates.map((tpl, idx) => (
      <li key={idx} onClick={() => this.handleTplClick(tpl)}>{tpl}</li>
    ));
  }

  handleTplClick(tpl) {
    this.props.onTplclick(tpl);
  }

  render() {
    const { show, dismiss } = this.props;

    return (
      <CSSTransition
        in={show}
        timeout={200}
        classNames="template"
        unmountOnExit>
        <Container onClickOutside={dismiss}>
          <List>
            {this.renderList()}
          </List>
        </Container>
      </CSSTransition>
    )
  }
}

export default MsgTemplates;