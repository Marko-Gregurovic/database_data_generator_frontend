import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SignupForm from '/components/SignupForm';
import MyNavbar from '/components/MyNavbar';
import { useAuth } from '../context/auth';

import 'core-js/es/promise';
import 'core-js/es/set';
import 'core-js/es/map';



const LoginPage = (props) => {
  const { auth, dispatch } = useAuth();

  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="cont">
      <MyNavbar />
      <SignupForm />
    </div>
  )
}



export default LoginPage;