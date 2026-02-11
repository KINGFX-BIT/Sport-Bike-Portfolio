import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import AllBikes from './pages/AllBikes';
import BikeDetails from './pages/BikeDetails';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bikes" element={<AllBikes />} />
                <Route path="/bikes/:id" element={<BikeDetails />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <PrivateRoute adminOnly>
                      <Admin />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
