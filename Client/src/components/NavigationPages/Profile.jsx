
import { authStore } from '../store/AuthStore';
import { User, Mail, ShieldCheck, LogOut, Camera, Edit3, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateProfile, isUpdatingProfile } = authStore();
  const navigate = useNavigate();

  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');

  useEffect(() => {
    if (user) {
      setUserName(user.userName || '');
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleNameUpdate = async () => {
    if (!userName.trim()) return;
    await updateProfile({ userName });
    setIsEditingName(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to a lightweight base64 JPEG string
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        // Send to backend store action
        updateProfile({ profilePic: compressedBase64 });
      };
    };
  };

  const hasName = Boolean(user?.userName && user.userName.trim() !== "");
  const nameInitial = hasName ? user.userName.trim().charAt(0).toUpperCase() : "U";

  return (
    // Added pt-20 to ensure the content clears the top navbar fully
    <div className="flex-1 bg-black text-white p-6 md:p-10 pt-20 md:pt-20 flex flex-col items-center justify-start min-h-full">
      
      {/* Header Title */}
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Account Profile</h1>
        <p className="text-white/70 text-sm mt-1">Manage your account credentials and personal preferences.</p>
      </div>

      {/* Main Profile Card */}
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#2ee6a8]/25 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col space-y-6">
        
        {/* Profile Header / Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-[#2ee6a8]/15">
          <div className="relative group">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#2ee6a8]/50 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#2ee6a8]/20 border-2 border-[#2ee6a8]/50 flex items-center justify-center text-[#2ee6a8] font-bold text-3xl shadow-md">
                {nameInitial}
              </div>
            )}
            
            {/* Hidden file input for uploading profile picture */}
            <label htmlFor="profile-pic-upload" className="absolute bottom-0 right-0 bg-[#2ee6a8] text-black p-1.5 rounded-full shadow cursor-pointer hover:bg-[#25b888] transition-colors">
              <Camera className="w-4 h-4" />
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-white">{user?.userName || "User"}</h2>
            <p className="text-sm text-[#2ee6a8] mt-0.5">Active Member</p>
            <span className="inline-flex items-center gap-1 text-xs text-white/70 bg-white/5 px-2.5 py-1 rounded-md mt-2 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2ee6a8]" /> Verified Account
            </span>
          </div>
        </div>

        {/* Credentials Details Fields */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* Editable Username Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#2ee6a8] font-medium flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Full Name / Username
            </label>
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex-1 bg-black border border-[#2ee6a8]/50 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2ee6a8]"
                />
              ) : (
                <div className="flex-1 bg-black border border-[#2ee6a8]/20 rounded-xl px-4 py-3 text-white text-sm">
                  {user?.userName || "Not provided"}
                </div>
              )}

              {isEditingName ? (
                <button
                  onClick={handleNameUpdate}
                  disabled={isUpdatingProfile}
                  className="bg-[#2ee6a8] hover:bg-[#25b888] text-black px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="bg-[#2ee6a8]/15 hover:bg-[#2ee6a8]/25 text-[#2ee6a8] border border-[#2ee6a8]/30 px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
              )}
            </div>
          </div>

          {/* UID Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#2ee6a8] font-medium flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> User ID (UID)
            </label>
            <div className="bg-black border border-[#2ee6a8]/20 rounded-xl px-4 py-3 text-white/70 font-mono text-xs select-all">
              {user?._id || "Unavailable"}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#2ee6a8] font-medium flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </label>
            <div className="bg-black border border-[#2ee6a8]/20 rounded-xl px-4 py-3 text-white text-sm">
              {user?.email || "Not provided"}
            </div>
          </div>

        </div>

        {/* Logout Action Button */}
        <div className="pt-4 border-t border-[#2ee6a8]/15 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Logout Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;