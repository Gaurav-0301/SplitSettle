
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Dashboard from './components/pages/Dashboard'
import NotFoundPage from './components/pages/NotFoundPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import { authStore } from './components/store/AuthStore';
import { useEffect } from 'react';



const App = () => {

 const { checkAuth } = authStore();

useEffect(() => {
    checkAuth();
}, []);

  return (
    <>
      <BrowserRouter>
      <Toaster
       position="top-right"
        reverseOrder={false}
      />
      <Routes>
       
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        
        <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
       
        
        <Route path='*' element={<NotFoundPage/>}></Route>
        
        </Routes>
        
        </BrowserRouter>
    </>
  )
}

export default App

