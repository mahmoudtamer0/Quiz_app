import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import AuthProvider from './context/AuthContext';
import RequireAuth from './context/RequireAuth';
import Verification from './components/Verification';
import RequireVerify from './context/RequireVerify';
import { Footer } from './components/Footer';


function App() {

  return (
    <div className="App">

      <div className='w-100'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/verification' element={
                <RequireVerify>
                  <Verification />
                </RequireVerify>
              } />
              <Route path='/' element={<>
                <RequireAuth>
                  <Dashboard />
                  <Products />
                  <Footer />
                </RequireAuth>
              </>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>

    </div>
  );
}

export default App;
