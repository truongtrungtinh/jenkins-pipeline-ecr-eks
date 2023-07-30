import axios from 'axios';
import { showAlert } from './alerts';

// export const signup = async (name, email, password, passwordConfirm) => {
export const signup = async (data) => {
  // {name, email, password, passwordConfirm}
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Created account successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    // `data` is the response that was provided by the server
    // `status` is the HTTP status code from the server response
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
