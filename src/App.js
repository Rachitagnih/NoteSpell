import './App.css';
import {
  BrowserRouter as Router,Routes,Route
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, {  useContext } from 'react';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from './components/Home';
import Notes from './components/Notes';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import noteContext from './context/notes/noteContext';


function App() {
  const context = useContext(noteContext);
  const {isLoggedIn} = context;
  return (
    <>
      
        <Router>
          <Navbar/>
          <Alert />
          <Routes>
            <Route path = "/" element={!isLoggedIn ?  <Navigate to="/login"/> : <Home/>}/>
            <Route path = "/about" element={!isLoggedIn ?  <Navigate to="/login"/> : <About/>}/>
            <Route path = "/notes" element={!isLoggedIn ?  <Navigate to="/login"/> : <Notes/>}/>
            <Route path = "/login" element={isLoggedIn ?  <Navigate to="/"/> : <Login/>}/>
            <Route path = "/signup" element={isLoggedIn ?  <Navigate to="/"/> : <Signup/>}/>
          </Routes>
        </Router>
      
    </>
  );
}

export default App;
