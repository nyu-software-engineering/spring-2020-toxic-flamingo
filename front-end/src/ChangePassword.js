import React from 'react';
// import logo from './logo.svg';
//import './About.css';

const ChangePassword = (props) => {

  return (
<div className="About">
    <h1>Change Password</h1>
    <section className="EmailForm">

              <form>
              <p>Current Password</p>
              <input type='password' name='currentpasswrd'/>
              <p>New Password: </p>
              <input type='password' name='pass' />
              <br/>
              <p>Confirm New Password: </p>
              <input type='text' name='cemail'  />
              <br/>
              <br />
              <button>Confirm</button>
              </form>
          </section>
</div>
  );
}

export default ChangePassword;