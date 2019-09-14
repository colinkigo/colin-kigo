import axios from 'axios';

export const getComments = () => {
  return async dispatch => {
    await axios.get('http://localhost:3010/api/home')
      .then(response => {
        dispatch({ type: 'COMMENTS', payload: response })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}