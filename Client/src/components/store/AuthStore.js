import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from 'react-hot-toast';

export const authStore = create((set, get) => ({
    isSignUp: false,
    isSignIn: false,
    isAuthenticated: false,
    userId: null,
    isAccess: false,
    isCheckingAuth:true,
    user:"",
    isUpdatingProfile:false,

    signIn: async (data) => {
        set({ isSignIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            if(res.data?.success){
              toast.success(res.data?.message);
               set({ userId: res.data?.user_id });
            }else{
                set({ isSignIn: false,
                      isAuthenticated:true
                });
                 toast.error(res.data?.message);
            }
           
        } catch (error) {
            set({ isSignIn: false });
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            console.log("Signup error details:", error.response?.data);
        }
    },

    signUp: async (data) => {
        set({ isSignUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            if (res.data?.success) {
                toast.success(res.data?.message);
                set({ userId: res.data?.user_id });
            } else {
                toast.error(res.data?.message || "Signup failed");
            }
        } catch (error) {
            set({ isSignUp: false });
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            console.error("Signup error:", error.response?.data || error);
        }
    },

    verifyOtp: async (data) => {
        const { userId } = get();
        try {
            const res = await axiosInstance.post(`/auth/otpverify/${userId}`, data);
            if (res.data?.success) {
                
                localStorage.setItem("AccessToken", res.data?.accessToken);
                toast.success("Authenticated successfully !");
                
                
                set({ 
                    isAuthenticated: true,
                    isSignUp: false 
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            console.error("OTP Verification error:", error.response?.data || error);
        }
    },

    resendOtp:async(data)=>{
        const { userId } = get();
        try {
            const res=await axiosInstance.post(`/auth/resendOtp/${userId}`,data);
            if(res.data?.success){
                toast.success(res.data?.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            console.error("OTP Verification error:", error.response?.data || error);
        }
    },

    checkAuth: async () => {
        try {
            const token=await axiosInstance.post("/auth/accessToken");
            if(token.data?.success){
                localStorage.setItem("AccessToken",token.data?.accessToken);
            }


            const res = await axiosInstance.get("/auth/getMe");
            if (res.data?.success) {
                set({ isAuthenticated: true,isCheckingAuth: false, user: res.data.userCredential });
               
                
            } else {
                set({ isAuthenticated: false, isCheckingAuth: false });
            }
        } catch (err) {
            localStorage.removeItem("AccessToken");
            set({ isAuthenticated: false,isCheckingAuth: false });
            console.log("checkAuth Error: " + err);
        }
    },

    logout:async()=>{
     try {
       const { userId } = get(); 
        const res=await axiosInstance.get(`/auth/logout/${userId}`);
        localStorage.removeItem("AccessToken");
        set({ isAuthenticated: false,isCheckingAuth: false,user:"" });
        if(res.data?.success){
        toast.success(res.data?. message);
        }
        


     } catch (error) {
        console.log("logout fails "+error);
         toast.error("logout fails "+error);
     }
    },

    updateProfile: async (data) => {
    const { user } = get();
    // Since your backend uses Mongoose, the ID field is typically _id
    const userId = user?.userId || user?.id;

    if (!userId) {
        toast.error("User session not found. Please log in again.");
        return;
    }

    set({ isUpdatingProfile: true });

    try {
        const res = await axiosInstance.put(`/auth/updateProfile/${userId}`, data);
        const resData = res.data;

        if (resData?.success) {
            // Fix: Access updatedData directly from the response root
            set({ 
                user: resData.updatedData, 
                isUpdatingProfile: false 
            });
            toast.success("Profile Updated Successfully !! ");
        }
    } catch (error) {
        console.log("profile updating fails " + error);
        toast.error("Profile Updatation Fails !! ");
        set({ isUpdatingProfile: false });
    }
},
}));