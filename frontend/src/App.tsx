import './App.css';
import 'bulma/css/bulma.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Posts from './components/Posts';
import Dashboard from './components/Dashboard';
import VerifyEmail from "./components/VerifyEmail";
import LikedPosts from './components/LikedPosts';
import DetailPost from './components/DetailPost';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux/store';
import { fetchPosts } from './redux/api/postSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks'; // 🔥 TYPED DISPATCH

// 🔥 INNER COMPONENT SA TYPED DISPATCH
function AppContent() {
  const dispatch = useAppDispatch(); // ✅ Type-safe dispatch

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
        <Route path="/posts/:slug" element={<DetailPost />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </CookiesProvider>
  );
}

export default App;