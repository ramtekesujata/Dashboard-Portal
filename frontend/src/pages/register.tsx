import React, { FormEvent, useLayoutEffect } from "react";
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
import { REGISTER_URL } from "../api/urls";
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import swal from 'sweetalert';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RegisterForm from "../modules/Register";
import { doSignUp } from "../api/requests";
import Loader from '../components/Loader'


interface User_Info{
  username:string;
  email:string;
  first_name:string;
  last_name:string;
}
const theme = createTheme();

export const Register=(params:any)=>{
  document.title=params.title;
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail ]=useState("");
  const [firstname,setFirstname ]=useState("");
  const [lastname,setLastname ]=useState("");
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [validator, setValidator] = useState({
    username : false,
    password: false,
    email: false,
    firstname: false,
    lastname: false
  })

  useEffect(() => {
    if(isloading){
      setTimeout(()=> {
        callSignupAPI()
      }, 3000)
    }
  }, [isloading])

  useLayoutEffect(() => {
    try {
      const authenticatedUser = sessionStorage.getItem("authenticatedUser");
      if (authenticatedUser) {
        const { isAuthenticated } = JSON.parse(authenticatedUser);

        if (isAuthenticated) {
          window.location.href = "/alerts";
        }
      }
    } catch (e) {}
  }, [navigate]);

  const onHandleChange = (name : any, status : boolean) => {
    setValidator(validator => ({...validator, [name] : status}))
  }

  const callSignupAPI = () => {
    // setIsLoading(true)
    let req = {
      username,
      password,
      email,
      "first_name":firstname,
      "last_name":lastname 
    }

    doSignUp(req)
    .then(res => {
      setIsLoading(false);
      swal('User Registered Successfully !!!', 'Please login to continue...', 'success')
      .then((updated:any) => updated ? navigate('/') : '')
    })
    .catch(err => {
      setIsLoading(false);
      setError(err)
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(username == '' || password == '' || email == '' || firstname == '' || lastname == ''){
      setIsLoading(false)
      if(username == '' && password == '' && email == '' && firstname == '' && lastname == ''){
        setValidator({...validator, username:true, password:true, email:true, firstname:true, lastname:true})
      }else{
        (username == '') ? onHandleChange('username', true) : onHandleChange('username', false);
        (password == '') ? onHandleChange('password', true) : onHandleChange('password', false);
        (email == '') ? onHandleChange('email', true) : onHandleChange('email', false);
        (firstname == '') ? onHandleChange('firstname', true) : onHandleChange('firstname', false);
        (lastname == '') ? onHandleChange('lastname', true) : onHandleChange('lastname', false)
      }
      setError('Please fill all the required fields')
      return
    }else{
      setValidator({...validator, username:false, password:false, email:false, firstname:false, lastname:false})
    }
    setIsLoading(true)
  };

  return (
    (isloading) ? 
      <Loader/>
      :
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
          <RegisterForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              email={email}
              setEmail={setEmail}
              firstname={firstname}
              setFirstname={setFirstname}
              lastname={lastname}
              setLastname={setLastname}
              onSubmit={onSubmit}
              validator={validator}
            />
        </Box>
      </Container>
    </ThemeProvider>
  );
}