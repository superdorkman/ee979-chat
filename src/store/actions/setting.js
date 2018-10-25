import * as types from './actionTypes';

export const login = (session) => ({
  type: 'LOGIN',
  session
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const updateToken = (id) => ({
  type: 'UPDATE_TOKEN',
  id
});

export const updateContextMenu = (menu) => ({
  type: types['TOGGLE_CONTEXT_MENU'],
  menu
});

export const setMsg = (msg) => ({
  type: 'SET_MSG',
  msg
});