import { combineReducers } from 'redux'

export const commentsReducer = (state = null, action) => {
  if (action.type === 'COMMENTS') {
    return {
      ...state,
      ...action.payload,
      message: '',
      error: false
    }
  }
  return ['nothing']
}

export default combineReducers({
  comments: commentsReducer
})