import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "./store/AuthStore";



const ProtectedRoute = () => {
  const {isAuthenticated,isCheckingAuth}=authStore();

if (isCheckingAuth) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#000000]">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-mint-200/20"></div>

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#6EE7B7] border-r-[#6EE7B7]"></div>

          <div className="absolute inset-4 animate-pulse rounded-full bg-[#6EE7B7]/20"></div>
        </div>

        {/* Loading text */}
        <p className="text-lg font-semibold tracking-widest text-[#6EE7B7] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

  if(!isAuthenticated){
    return <Navigate to="/" replace/>
  }
  return <Outlet/>
}

export default ProtectedRoute
