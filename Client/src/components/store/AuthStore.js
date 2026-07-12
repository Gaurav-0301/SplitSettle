import {axiosInstance} from "../lib/axios";
import {create} from "zustand"
import { toast } from 'react-hot-toast';

export const authStore=create((set,get)=>({
    
    isSignUp:false,
    isSignIn:false,
    isAuthenticated:false,

    signIn:async(data)=>{
        
        try {
            const res=await axiosInstance.post("/auth/login",data);
            toast.success(res.data?.message);
            if(res.data?.success){
                set({isSignIn:true});
            }


        } catch (error) {
            const errorMessage=error.response?.data?.message ||"An error occured";
            toast.error(errorMessage);
            console.log("Signup error details:", error.response?.data);
        }
    },

    signUp: async (data) => {
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        console.log(res.data?.success);

        if (res.data?.success) {
            toast.success(res.data?.message);
            set({ isSignUp: true });
        } else {
            toast.error(res.data?.message || "Signup failed");
        }

    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An error occurred";

        toast.error(errorMessage);
        console.error("Signup error:", error.response?.data || error);
    }
},

}));