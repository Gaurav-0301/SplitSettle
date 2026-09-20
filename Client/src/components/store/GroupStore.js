import { create } from 'zustand';
import { axiosInstance } from "../lib/axios";
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const groupStore = create((set) => ({
  searchResult: null,
  isSearching: false,

  
  searchUser: async (uid) => {
    
    if (!uid.trim()){
      const errorMsg = "uid required";
      toast.error(errorMsg);
      return;
    } 
    
    set({ isSearching: true, searchResult: null });
    try {
      
      const response = await axiosInstance.get(`/group/searchUser/${uid.trim()}`);
      console.log(response.data.success);
      
      if (response.data.success) {
        console.log(" response data "+response.data.user)
        set({ 
          searchResult: response.data.user, 
          isSearching: false 
        });
      }
    } catch (error) {
      set({ searchResult: null, isSearching: false });
     
      const errorMsg = error.response?.data?.message || "User not found";
      toast.error(errorMsg);
    }
  },

  clearSearchResult: () => set({ searchResult: null })
}));