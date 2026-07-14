import {axiosInstance} from "../lib/axios";
import {create} from "zustand"
import { toast } from 'react-hot-toast';

export const authStore=create((set,get)=>({
    
    isSignUp:false,
    isSignIn:false,
    isAuthenticated:false,
    userId:null,
    isAccess:false,
   

    signIn:async(data)=>{
        set({isSignIn:true});
        
        try {
            
            const res=await axiosInstance.post("/auth/login",data);
            toast.success(res.data?.message);
           


        } catch (error) {
             set({isSignIn:false});
            const errorMessage=error.response?.data?.message ||"An error occured";
            toast.error(errorMessage);
            console.log("Signup error details:", error.response?.data);
        }
    },

    signUp: async (data) => {
        set({ isSignUp: true });
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        console.log(res.data?.user_id);
        

        if (res.data?.success) {
            toast.success(res.data?.message);
            
            set({userId:res.data?.user_id})
        } else {
            toast.error(res.data?.message || "Signup failed");
        }

    } catch (error) {
        set({ isSignUp: false });
        const errorMessage =
            error.response?.data?.message || "An error occurred";

        toast.error(errorMessage);
        console.error("Signup error:", error.response?.data || error);
    }
},

verifyOtp:async (data)=>{
     const { userId } = get();
try {
    const res=await axiosInstance.post(`/auth/otpverify/${userId}`,data);
    if(res.data?.success){
        localStorage.setItem("AccessToken:",res.data?.accessToken)
        toast.success("Authenticated successfully !");
        set({isAuthenticated:true})
    }

} catch (error) {
    const errorMessage =
            error.response?.data?.message || "An error occurred";

        toast.error(errorMessage);
        console.error("Signup error:", error.response?.data || error);
}
},

checkAuth:async()=>{
    try {
        const res=axiosInstance.get("/auth/getMe");
        if(res.data.success){
            set({
                isAccess:true,
            });
        }
    } catch (err) {
        set({
                isAccess:false,
            });
            console.log("checkAuth Error "+err);
    }
},

}));