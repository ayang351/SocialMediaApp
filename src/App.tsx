import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from './pages/main/home'
import {Login} from './pages/login'
import {Navbar} from './components/navbar'
import { Createpost } from './pages/create-post/createpost';


function App() {
  return (
    <div className="App">
      <Router> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/createpost" element={<Createpost />}/>

        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
