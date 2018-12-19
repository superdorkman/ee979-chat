import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 292px;
  background-color: #8868f1;
  -webkit-app-region: no-drag;
  user-select: none;
  color: #fff;
`;

export const LogoWrap = styled.div`
  display: flex;
  padding: 0 50px;
  height: 176px;
  min-height: 176px;
  align-items: center; 
`;

export const Chats = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
  cursor: pointer;
  border-top: 1px solid #b6a4f1;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(234,234,234,.2);

    &:hover {
      background-color: rgba(234,234,234,.4);
    }
  }
`;

export const ChatItem = styled.li`
  position: relative;
  display: flex;
  padding-left: 12px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 58px;
  min-height: 58px;
  transition: all 0.1s;

  &:not(:last-child) {
    border-bottom: 1px solid #b6a4f1;
  }

  .id {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    min-width: 32px;
    height: 24px;
    background-color: #fff;
    color: #8868f1;
    border-radius: 2px;
    font-size: 12px;
    line-height: 24px;
    margin-right: 12px;
  }

  .info {
    flex: 1;
    width: 70%;

    h4, p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    h4 {
      font-size: 14px;
      margin-bottom: 2px;
      width: 150px;
    }

    p {
      width: 180px;
    }
  }

  .time {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .badge {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 14px;
    background-color: red;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    line-height: 14px;
  }

  ${props => props.active && css`
    background-color: #fff;
    border-color: #fff;
    box-shadow: 0 7px 16px rgba(36,36,36,0.39);

    .id {
      background-color: #8868f1;
      color: #fff;
    }

    .info, .time {
      color: #4e4e4e;
    }
  `}

  

  
`;