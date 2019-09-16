import { combineReducers } from 'redux'

const initialState = {
  data: [],
  error: false,
  message: ''
}

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REVIEWS':
      return {
        ...state,
        data: [ ...action.payload ],
        message: '',
        error: false
      }
    case 'ADDED_REVIEW':
      state.data.push(action.payload.comment)
      return {
        ...state,
        data: [ ...state.data ]
      }
    default:
      return state
  }
}

export default combineReducers({
  reviews: reviewsReducer
})