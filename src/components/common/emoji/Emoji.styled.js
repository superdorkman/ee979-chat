import styled from 'styled-components';
import qqFaces from '../../../assets/icons/qq-faces.png';
import emoji from '../../../assets/icons/emoji.png';

export const Wrapper = styled.div`
  border: 1px solid #dedede;
  background-color: #fff;
  border-radius: 4px;

  &:after {
    content: '';
    position: absolute;
    left: 16px;
    bottom: -5px;
    margin-left: 2px;
    width: 10px;
    height: 10px;
    border: 1px solid;
    border-color: transparent #dedede #dedede transparent;
    transform: rotate(45deg);
    background-color: #fff;
  }

`;

export const Menus = styled.ul`
  padding: 8px 20px 0;
  overflow: hidden;
  background-color: #f2f2f2;
  display: flex;
  user-select: none;

  li {
    width: 70px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    
    &.active {
      background-color: #fff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
`;

export const EmojiWrap = styled.div`
  padding: 15px 20px;

  .qq-face {
    overflow: hidden;
    width: 435px;
    height: 202px;
    margin-right: -1px;
    display: flex;
    flex-wrap: wrap;
  
    a {
      display: block;
      width: 29px;
      height: 29px;
      font-size: 0;
      text-indent: -999em;
      border-bottom: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      background-image: url(${qqFaces});
  
      &:nth-child(15n + 15) {
        width: 28px;
        border-right: none;
      }
    }
  }
  
  .emoji-face {
    width: 435px;
    height: 202px;
    margin-right: -1px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
  
    &::-webkit-scrollbar {
      width: 0;
    }
  
    a {
      display: block;
      width: 29px;
      height: 29px;
      font-size: 0;
      text-indent: -999em;
      border-bottom: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      background-image: url(${emoji});
  
      &:nth-child(15n + 15) {
        width: 28px;
        border-right: none;
      }
    }
  }
`;