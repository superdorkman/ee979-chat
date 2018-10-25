import * as types from '../actions/actionTypes';

const initialSetting = {
  session: {},
  showDialog: false,
  toast: '',
  myAllInfo: {},
  showToTop: false,
  message: '',
  contextMenu: {
    show: false,
    type: 'text',
    top: 20,
    left: 20,
  }
}

const setting = (state = initialSetting, action) => {
  // console.log(action)
  switch (action.type) {
    case 'OPEN_SNACK':
      return {
        ...state,
        snack: action.text
      }
    case 'SET_MSG':
      return {
        ...state,
        message: action.msg
      }
    case 'TOGGLE_DIALOG':
      return {
        ...state,
        showDialog: !state.showDialog,
        dialog: action.text
      }
    case 'SET_CHATSN':
      return {
        ...state,
        memberSN: action.sn
      }
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title
      }
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        myAllInfo: action.info
      }
    case 'TOGGLE_TOTOP':
      return {
        ...state,
        showToTop: action.status
      }
    case 'UPDATE_TOKEN':
      return {
        ...state,
        session: {
          ...state.session,
          id: action.id
        }
      }
    case types.TOGGLE_CONTEXT_MENU:
      return {
        ...state,
        contextMenu: {
          ...state.contextMenu,
          ...action.menu,
        },
      }
    default:
      return state
  }
}

export default setting;