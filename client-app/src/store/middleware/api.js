import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
  if (action.type != actions.apiCall.type) return next(action);

  const { url, onSuccess, onFailure, onStart, method, data } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL: 'http://www.ticketing-dev-micro.xyz/api/bugs',
      url,
      method,
      data,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onFailure) dispatch({ type: onFailure, payload: error.message });
  }
};

export default api;
