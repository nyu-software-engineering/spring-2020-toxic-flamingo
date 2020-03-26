import React from 'react';
// import logo from './logo.svg';
//import './About.css';

const ChangeEmail = (props) => {

  return (
<div className="About">
    <h1>Change Email</h1>
    <section className="EmailForm">

              <form>
              <p>New Email: </p>
              <input type='text' name='email' />
              <br/>
              <p>Confirm Email: </p>
              <input type='text' name='cemail'  />
              <br/>
              <br />
              <button>Confirm</button>
              </form>
          </section>
</div>
  );
}

export default ChangeEmail;