import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContainer from '../src/components/Auth'
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/login';
import { Register } from './pages/register';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <div>
              <Login title="Login"/>
            </div>
          }
        />
        <Route
          path="/Register"
          element={
            <div>
              <Register title="Register"/>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <AppContainer>
              <Dashboard title="Dashboard"/>
            </AppContainer>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
