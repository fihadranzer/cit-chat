import "./App.css";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import firebaseConfig from "./FirebaseConfig";
import {BrowserRouter  as Router, Routes, Route}from 'react-router-dom'
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Registration/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>

     
    </>
  );
}

export default App;
