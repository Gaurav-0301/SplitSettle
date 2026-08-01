
import { BrowserRouter,Routes,Route } from 'react-router-dom'


import NotFoundPage from './components/pages/NotFoundPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import { authStore } from './components/store/AuthStore';
import { useEffect } from 'react';
import Navbar from './components/NavigationPages/Navbar';
import Profile from './components/NavigationPages/Profile';
import Groups from './components/NavigationPages/Groups';



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
      <Navbar/>
      <Routes>
       
       
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        
        <Route element={<ProtectedRoute />}>
       

        <Route path="/groups" element={<Groups />}/>

         <Route path="/profile" element={<Profile />}/>

        </Route>

        
        
       
        
        <Route path='*' element={<NotFoundPage/>}></Route>
        
        </Routes>
        
        </BrowserRouter>
    </>
  )
}

export default App

