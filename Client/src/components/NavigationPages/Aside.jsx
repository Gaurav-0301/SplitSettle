
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  Info, 
  Settings, 
  Plus
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AsideNav = ({ user }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Match schema property: userName instead of fullName
  const hasName = Boolean(user?.userName && user.userName.trim() !== "");
  const nameInitial = hasName ? user.userName.trim().charAt(0).toUpperCase() : "";

  return (
    <aside className="h-full w-16 bg-black border-r border-[#2ee6a8]/25 flex flex-col justify-between items-center py-4 shrink-0 z-30">
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <Link 
          to="/" 
          title="Dashboard" 
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPath === '/' 
              ? 'bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/40 shadow-inner' 
              : 'text-white/70 hover:text-white hover:bg-[#2ee6a8]/10'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 text-[#2ee6a8]" />
        </Link>
        <Link 
          to="/groups" 
          title="Groups" 
          className={`w-10 h-10 rounded-xl my-3 flex items-center justify-center transition-all ${
            currentPath === '/groups' 
              ? 'bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/40 shadow-inner' 
              : 'text-white/70 hover:text-white hover:bg-[#2ee6a8]/10'
          }`}
        >
          <Users className="w-5 h-5  text-[#2ee6a8]" />
        </Link>
        <Link 
          to="/settle" 
          title="Settle" 
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPath === '/settle' 
              ? 'bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/40 shadow-inner' 
              : 'text-white/70 hover:text-white hover:bg-[#2ee6a8]/10'
          }`}
        >
          <Receipt className="w-5 h-5 text-[#2ee6a8]" />
        </Link>
        <Link 
          to="/about" 
          title="About Us" 
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPath === '/about' 
              ? 'bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/40 shadow-inner' 
              : 'text-white/70 hover:text-white hover:bg-[#2ee6a8]/10'
          }`}
        >
          <Info className="w-5 h-5 text-[#2ee6a8]" />
        </Link>
      </div>

      {/* Bottom Icons: Settings & User Avatar */}
      <div className="flex flex-col items-center space-y-3 w-full">
         <Link 
          to="/createGroup" 
          title="Create Group" 
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPath === '/profile' 
              ? 'bg-[#2ee6a8]/25 text-[#2ee6a8] border border-[#2ee6a8]/60 shadow-inner' 
              : 'bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/40 hover:bg-[#2ee6a8]/25'
          }`}
        >
          <Plus className="w-5 h-5" />
        </Link>

        <Link 
          to="/profile" 
          title="Account Profile" 
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPath === '/profile' 
              ? 'bg-[#2ee6a8]/25 text-[#2ee6a8] border border-[#2ee6a8]/60 shadow-inner' 
              : 'bg-[#2ee6a8]/15 text-[#2ee6a8] border border-[#2ee6a8]/40 hover:bg-[#2ee6a8]/25'
          }`}
        >
          <Settings className="w-5 h-5" />
        </Link>

        <div className="w-full px-2 flex justify-center pt-2 border-t border-[#2ee6a8]/20">
          <Link to="/profile" title={user?.userName || "Profile"}>
            {hasName ? (
              <div className="w-9 h-9 rounded-full bg-[#2ee6a8]/20 border border-[#2ee6a8]/40 flex items-center justify-center text-[#2ee6a8] font-bold text-xs shadow">
                {nameInitial}
              </div>
            ) : (
              <img
                src={user?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border border-[#2ee6a8]/40 shadow"
              />
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

AsideNav.defaultProps = {
  user: null,
};

export default AsideNav;