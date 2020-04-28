import axios from 'axios';

export const signUp = data => {
    return async dispatch => {
      try {
        await axios.post('http://localhost:5000/users/signup', data);
  
        dispatch({
          type: AUTH_SIGN_UP
        });
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Email is already in use'
        })
      }
    };
  }
  
  export const signIn = data => {
    return async dispatch => {
      try {
        await axios.post('http://localhost:5000/users/signin', data);
  
        dispatch({
          type: AUTH_SIGN_IN
        });
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Email and password combination isn\'t valid'
        })
      }
    };
  }
  
  export const checkAuth = () => {
    return async dispatch => {
      try {
        await axios.get('http://localhost:5000/users/status');
  
        dispatch({
          type: AUTH_SIGN_IN
        });
  
        console.log('user is auth-ed')
      } catch(err) {
        console.log('error', err)
      }
    };
  }
  
  export const getDashboard = () => {
    return async dispatch => {
      try {
        const res = await axios.get('http://localhost:5000/users/dashboard')
  
        dispatch({
          type: DASHBOARD_GET_DATA,
          payload: res.data
        })
  
      } catch(err) {
        console.error('err', err)
      }
    }
  }
  
  export const signOut = () => {
    return async dispatch => {
      await axios.get('http://localhost:5000/users/signout');
  
      dispatch({
        type: AUTH_SIGN_OUT
      })
    };
}