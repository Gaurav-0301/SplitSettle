import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './components/pages/NotFoundPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import { authStore } from './components/store/AuthStore';
import { useEffect } from 'react';
import Navbar from './components/NavigationPages/Navbar';
import Profile from './components/NavigationPages/Profile'
import Groups from './components/NavigationPages/Groups';
import AsideNav from './components/NavigationPages/Aside';
import CreateGroupFlow from './components/NavigationPages/CreateGroupsFlow';

const App = () => {
  const { checkAuth, isAuthenticated, user,isUpdatingProfile } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth,isAuthenticated,isUpdatingProfile]);



  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Outer container takes full height */}
      <div className="flex flex-col w-full h-screen bg-black text-white m-0 p-0 overflow-hidden">
        
        {/* Navbar */}
        <Navbar />
        
        {/* Body content wrapper */}
        <div className="flex flex-row flex-1 w-full relative overflow-hidden">
          
          {/* Sticky AsideNav */}
          {isAuthenticated && (
            <div className="h-full sticky top-0 shrink-0">
              <AsideNav user={user} />
            </div>
          )}
          
          {/* Scrollable Main Content Area */}
          <div className="flex-1 h-full overflow-y-auto bg-black">
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/groups" element={<Groups />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/createGroup" element={<CreateGroupFlow />} />
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
          
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;