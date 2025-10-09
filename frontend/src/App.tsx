import './App.css';
import 'bulma/css/bulma.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Posts from './components/Posts';
import Dashboard from './components/Dashboard';
import VerifyEmail from "./components/VerifyEmail"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // 🔥 DODAJ Redux Provider
import { CookiesProvider } from 'react-cookie'; // 🔥 DODAJ Cookies Provider
import { store } from './redux/store'; // 🔥 DODAJ store import
import LikedPosts from './components/LikedPosts';


function App() {
  return (
    <CookiesProvider> {/* 🔥 Wrap sa CookiesProvider */}
      <Provider store={store}> {/* 🔥 Wrap sa Redux Provider */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/liked-posts" element={<LikedPosts />} />
          </Routes>
        </Router>
      </Provider>
    </CookiesProvider>
  );
}

export default App;