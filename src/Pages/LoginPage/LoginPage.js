import React from 'react';
import { Navigation } from '../../Components/Navigation/Navigation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Utils/Constant';
import {
  BoxWrapper,
  H3,
  H1Text,
  SmallText,
  BoxContainer,
  H2,
  BoxForm,
  Input,
  Button,
  MutedLink,
} from "../RegisterPage/RegisterPageStyled";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault();
        onLogin(email, password);

        fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: email, 
            password: password,
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.err) {
            setLoginError(data.err);
          } else {
            localStorage.setItem("token", data.token);
          }
        })
        navigate('/')
      }

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div>
      <Navigation></Navigation>
      
      <BoxWrapper>
        <H1Text>Welcome Back!</H1Text>
        <SmallText>Please log in to continue!</SmallText>
      </BoxWrapper>

      {loginError && <H3>Error: {loginError}!</H3>}

      <BoxContainer>
        <H2>Log in</H2>
        
        <BoxForm onSubmit={submitHandler}>
          <Input type="email" placeholder='email' required 
          onChange={handleEmailChange}></Input>
          <Input type="password" placeholder="password" required  
          onChange={handlePasswordChange}></Input>
          <Button type="submit">Log in</Button>

          <MutedLink to='/register' href="/register">
            Don't have an account? Register
          </MutedLink> 

        </BoxForm>
      </BoxContainer>
    </div>
  )
}

export default LoginPage;