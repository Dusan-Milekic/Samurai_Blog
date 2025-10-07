import './App.css';
import 'bulma/css/bulma.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Posts from './components/Posts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;