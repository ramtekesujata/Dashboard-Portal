import React, { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import logo from '../logo.png';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import LoginForm from "../modules/Login";
import { LOGIN_URL } from "../api/urls";
import { ReactDOM } from "react";
import { HashRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { doSignIn } from "../api/requests";
import Loader from '../components/Loader'




const theme = createTheme();

export const Login=(params:any)=>{
  document.title=params.title;
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validator, setValidator] = useState({
    username : false,
    password: false
  })
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isloading){
      setTimeout(()=> {
        callSigninAPI()
      }, 3000)
    }
  }, [isloading])
  
  useLayoutEffect(() => {
    try {
      const authenticatedUser = sessionStorage.getItem("authenticatedUser");
      if (authenticatedUser) {
        const { isAuthenticated } = JSON.parse(authenticatedUser);

        if (isAuthenticated) {
          window.location.href = "/";
        }
      }
    } catch (e) {}
  }, [navigate]);

  const callSigninAPI = () => {
    // setIsLoading(true)
    const trimmedUserName = username.trim().toLowerCase();
    const trimmedPassword = password.trim().toLowerCase();
    let req = {
      "username": trimmedUserName,
      "password": trimmedPassword
    }
    doSignIn(req)
      .then( res=> {
        setIsLoading(false);
        if(res.non_field_errors){
          setError(res.non_field_errors[0])
        }else{
          let x = res.token;
          localStorage.setItem('Token',x)
          localStorage.setItem('Username',res.user_data['username'])
          if(x)
          {
            // redirect
            sessionStorage.setItem(
              "authenticatedUser",
              JSON.stringify({ isAuthenticated: true, username: username.trim() })
            );
            navigate("/");
          }
          else{
            console.log('Login: Try again')
          }
        }
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
        setError(err)
      })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(username == '' || password == ''){
      setIsLoading(false)
      if(username == '' && password == ''){
        setValidator({...validator, username:true, password:true})
        setError('Username and Password are required')
      }else if(username == ''){
        setValidator({...validator, username: true, password:false})
        setError('Username is required')
      }else if(password == ''){
        setValidator({...validator, username:false, password : true})
        setError('Password is required')
      }
      return
    }else{
      setValidator({...validator, username:false, password:false})
    }
    setIsLoading(true)
  }

  return (
    (isloading) ? 
      <Loader/>
      :
      <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              onSubmit={onSubmit}
              validator={validator}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}