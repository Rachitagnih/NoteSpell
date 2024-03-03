import './App.css';
import {
  BrowserRouter as Router,Routes,Route
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from './components/Home';
import Notes from './components/Notes';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert />
          <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/about" element={<About/>}/>
            <Route path = "/notes" element={!localStorage.getItem("token") ?  <Navigate to="/login"/> : <Notes/>}/>
            <Route path = "/login" element={localStorage.getItem("token") ?  <Navigate to="/"/> : <Login/>}/>
            <Route path = "/signup" element={localStorage.getItem("token") ?  <Navigate to="/"/> : <Signup/>}/>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
