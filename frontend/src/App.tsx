import './App.css';
import 'bulma/css/bulma.css';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <>
      <Navigation />
      <section className="section">
        <div className="container">
          <h1 className="title">Welcome Home!</h1>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;