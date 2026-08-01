import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon, 
  Mail, 
  Hash, 
  Shield, 
  Camera,
  Info,
  Check,
  Pencil
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { authStore } from '../store/AuthStore';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = authStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // Editable fields state
  const [fullName, setFullName] = useState(authUser?.fullName || '');
  const [email, setEmail] = useState(authUser?.email || '');
  
  // Toggle for Name edit state
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if authUser loads later
  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName || '');
      setEmail(authUser.email || '');
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ fullName, email });
      setIsEditingName(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Determine avatar vs name initial logic
  const hasName = Boolean(authUser?.fullName && authUser.fullName.trim() !== "");
  const nameInitial = hasName ? authUser.fullName.trim().charAt(0).toUpperCase() : "";

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      
      {/* Top Navbar Header */}
      <header className="h-16 bg-black border-b border-[#2ee6a8]/25 shrink-0 px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-[#2ee6a8] hover:text-white p-1.5 rounded-xl bg-[#2ee6a8]/10 border border-[#2ee6a8]/30"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2ee6a8]/10 flex items-center justify-center border border-[#2ee6a8]/30 shadow-md shadow-[#2ee6a8]/10">
              <Receipt className="w-5 h-5 text-[#2ee6a8]" />
            </div>
            <h1 className="text-lg font-extrabold tracking-wide text-[#2ee6a8]">SplitSettle</h1>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Aside Navbar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 h-full w-64 bg-black border-r border-[#2ee6a8]/25 
          flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
          lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Top: Navigation Links */}
          <div className="p-4 space-y-1.5">
            <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-[#2ee6a8]/10 font-medium transition-all">
              <LayoutDashboard className="w-4 h-4 text-[#2ee6a8]" />
              Dashboard
            </Link>
            <Link to="/groups" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-[#2ee6a8]/10 font-medium transition-all">
              <Users className="w-4 h-4 text-[#2ee6a8]" />
              Groups
            </Link>
            <Link to="/settle" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-[#2ee6a8]/10 font-medium transition-all">
              <Receipt className="w-4 h-4 text-[#2ee6a8]" />
              Settle
            </Link>
            <Link to="/about" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-[#2ee6a8]/10 font-medium transition-all">
              <Info className="w-4 h-4 text-[#2ee6a8]" />
              About Us
            </Link>
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2ee6a8]/15 text-white font-bold text-base border border-[#2ee6a8]/40 transition-all shadow-inner">
              <Settings className="w-5 h-5 text-[#2ee6a8]" />
              Account Profile
            </Link>
          </div>

          {/* Bottom Left Corner: Logout & User Snapshot */}
          <div className="p-4 border-t border-[#2ee6a8]/25 bg-black">
            <div className="flex items-center gap-3 mb-3">
              {hasName ? (
                <div className="w-9 h-9 rounded-full bg-[#2ee6a8]/20 border border-[#2ee6a8]/40 flex items-center justify-center text-[#2ee6a8] font-bold text-sm shadow">
                  {nameInitial}
                </div>
              ) : (
                <img
                  src={authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-[#2ee6a8]/40 shadow"
                />
              )}
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{authUser?.fullName || "User"}</div>
                <div className="text-[10px] text-white/60 truncate">{authUser?.email || "user@example.com"}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full bg-[#2ee6a8]/10 hover:bg-[#2ee6a8] hover:text-black text-white font-bold py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs border border-[#2ee6a8]/30 shadow-lg shadow-[#2ee6a8]/5"
            >
              <LogOut className="w-3.5 h-3.5 " />
              Log Out
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 z-20 lg:hidden backdrop-blur-sm"
          />
        )}

        {/* Profile Content Scrollable Area */}
        <main className="flex-1 h-full overflow-y-auto bg-black p-4 md:p-6 flex justify-center items-center">
          <div className="w-full max-w-xl bg-black border border-[#2ee6a8]/30 rounded-2xl shadow-2xl shadow-[#2ee6a8]/10 p-5 md:p-6">
            
            <h2 className="text-lg font-extrabold text-[#fcfcfc] mb-4 pb-2 border-b border-[#2ee6a8]/20 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Account Profile
            </h2>

            {/* Avatar / Initial Section */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative">
                {hasName ? (
                  <div className="w-24 h-24 rounded-full bg-[#2ee6a8]/15 border-2 border-[#2ee6a8]/60 flex items-center justify-center text-[#2ee6a8] text-3xl font-extrabold shadow-lg shadow-[#2ee6a8]/20">
                    {nameInitial}
                  </div>
                ) : (
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#2ee6a8]/60 shadow-lg shadow-[#2ee6a8]/20"
                  />
                )}
                
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-[#2ee6a8] hover:bg-[#25b884] 
                    text-black p-2 rounded-full cursor-pointer 
                    transition-all duration-200 shadow-lg font-bold
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-4 h-4 text-black" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-[11px] text-white/60 mt-2">
                {isUpdatingProfile ? "Uploading..." : "Click camera to update photo"}
              </p>
            </div>

            {/* User Details Form Fields */}
            <form onSubmit={handleSaveChanges} className="space-y-3 mb-5">
              
              {/* Full Name Input with Edit Symbol on the Right Corner */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-semibold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                    <UserIcon className="w-3 h-3 text-[#2ee6a8]" /> Full Name
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(!isEditingName)}
                    className="text-[#2ee6a8] hover:text-white p-1 rounded-md transition-colors flex items-center gap-1 text-[10px] font-bold"
                    title="Edit Name"
                  >
                    <Pencil className="w-3 h-3" />
                    {isEditingName ? "Cancel" : "Edit"}
                  </button>
                </div>
                
                {isEditingName ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-[#050a08] border border-[#2ee6a8]/40 rounded-xl px-3.5 py-2.5 text-white text-sm font-medium focus:outline-none focus:border-[#2ee6a8] transition-colors"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-[#2ee6a8] hover:bg-[#25b884] text-black px-4 rounded-xl font-bold flex items-center justify-center text-xs transition-all disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full bg-[#050a08] border border-[#2ee6a8]/25 rounded-xl px-3.5 py-2.5 text-white text-sm font-medium">
                    {authUser?.fullName || "Not provided"}
                  </div>
                )}
              </div>

              {/* Email Address (Read-only / Default) */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#2ee6a8]" /> Email Address (Default)
                </label>
                <div className="w-full bg-[#050a08] border border-[#2ee6a8]/15 rounded-xl px-3.5 py-2.5 text-white/50 text-sm font-medium select-none">
                  {authUser?.email || "Not provided"}
                </div>
              </div>

              {/* User UID (Read-only / Default) */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="w-3 h-3 text-[#2ee6a8]" /> User UID (Default)
                </label>
                <div className="w-full bg-[#050a08] border border-[#2ee6a8]/15 rounded-xl px-3.5 py-2.5 text-white/50 font-mono text-xs tracking-wide select-none">
                  {authUser?._id || "Unavailable"}
                </div>
              </div>
            </form>

            {/* Account Status Box */}
            <div className="bg-[#050a08] border border-[#2ee6a8]/25 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#2ee6a8]" />
                <div>
                  <h3 className="text-xs font-bold text-white">Account Status</h3>
                  <p className="text-[10px] text-white/60">Active & Connected</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/30">
                Verified
              </span>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default ProfilePage;