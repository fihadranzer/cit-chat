import "./App.css";
import Registration from "./pages/Registration";
import {BrowserRouter  as Router, Routes, Route}from 'react-router-dom'
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>

     
    </>
  );
}

export default App;
