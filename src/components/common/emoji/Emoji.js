import React, { Component } from 'react';
import { Wrapper, Menus, EmojiWrap } from './Emoji.styled';
import { QQ_FACES, EMOJI_FACES } from './faces';

class Emoji extends Component {

  state = {
    menus: ['QQ表情', 'Emoji'],
    curMenuIdx: 0,
  }

  renderMenus() {
    const { curMenuIdx, menus, } = this.state;

    return menus.map((menu, idx) => (
      <li className={idx === curMenuIdx ? 'active' : ''} key={idx}
        onClick={() => this.handleMenuClick(idx)}>{menu}</li>
    ));
  }

  handleMenuClick(idx) {
    this.setState({ curMenuIdx: idx });
  }

  renderEmojis(type) {
    const emojis = type === 'qq' ? QQ_FACES : EMOJI_FACES;

    return emojis.map((emoj, idx) => (
      <a key={idx}
        onClick={() => this.handleEmojiClick(type, emoj)}
        title={emoj.title}
        style={{ backgroundPosition: emoj.pos }}></a>
    ));
  }

  handleEmojiClick(type, emoj) {
    this.props.onSelect(type, emoj);
  }

  render() {
    const { curMenuIdx } = this.state;

    return (
      <Wrapper>
        <Menus>
          {this.renderMenus()}
        </Menus>

        <EmojiWrap>
          {curMenuIdx === 0 ? (
            <div className="qq-face">
              {this.renderEmojis('qq')}
            </div>
          ) : (
              <div className="emoji-face">
                {this.renderEmojis('emoji')}
              </div>
            )}
        </EmojiWrap>
      </Wrapper>
    )
  }
}

export default Emoji;