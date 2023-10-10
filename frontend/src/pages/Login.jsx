import React from 'react'
import LoginComp from '../components/Login/Login';
import SLoginComponent from '../components/Login/SLogin';
import TLoginComponent from '../components/Login/TLogin';

const Login = ({choose}) => {

  return (
      <div>
        {choose === 0 ? (
          <LoginComp/>
        ) : choose === 1 ? (
          <SLoginComponent />
        ) : (
          <TLoginComponent />
        )}
      </div>
    
  )
}

export default Login;