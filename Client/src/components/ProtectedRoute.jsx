import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "./store/AuthStore";



const ProtectedRoute = () => {
  const {isAccess}=authStore();
  if(!isAccess){
    return <Navigate to="/" replace/>
  }
  return <Outlet/>
}

export default ProtectedRoute
