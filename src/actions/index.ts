import axios from 'axios';

export const getComments = () => {
  return async dispatch => {
    await axios.get('/api/home')
      .then(response => {
        dispatch({ type: 'GET_REVIEWS', payload: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export const addNewReview = (name, review) => {
  return async dispatch => {
    const response = await axios.post('/api/home', { user: name, review })
    if (response.data) {
      dispatch({ type: 'ADDED_REVIEW', payload: response.data })
    } else {
      console.log('From Server: Something went wrong while adding');
    }
  }
}

export const updateReview = (_id, user, update) => {
  return async dispatch => {
    const response = await axios.put(`/api/home/${_id}`, { user, comm: update })
    if (response) {
      dispatch({ type: 'UPDATED_REVIEW', payload: response.data })
      return response
    } else {
      console.log('From Server: Something went wrong while updating');
    }
  }
}

export const deleteReview = (_id, payload) => {
  return async dispatch => {
    const response = await axios.delete(`/api/home/${_id}`, { params: payload })
    if (response) {
      dispatch({ type: 'DELETED_REVIEW', payload: response.data })
      return response
    } else {
      console.log('From Server: Something went wrong while deleting');
    }
  }
}