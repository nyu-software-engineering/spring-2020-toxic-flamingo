import React from 'react';


const logIn = (props) => {

    return (
  <div className="LogIn">
      <h1>Welcome to Sharmony!</h1>
      <section className="main-content">
          
          <img alt="Sharmony Logo" src="C:\Users\Kay James\Documents\sharmony\spring-2020-toxic-flamingo\front-end\public\SharmonyLogo.PNG" />
          <form onSubmit={this.handleSubmit}>
          <p>Username: </p>
          <input type='text' name='username' />
          <br/>
          <p>Password: </p>
          <input type='password' name='password'  />
          <br/>
          <br/>
          <input type='submit' />
          </form>
      </section>
  </div>
    );
  }


  
  export default logIn;