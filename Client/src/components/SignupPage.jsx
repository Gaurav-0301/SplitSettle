import { useState } from 'react';
import { MessagesSquare, User, Mail, Lock, EyeOff, Eye, Loader } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-hot-toast';
import AuthImagePattern from './AuthImage';

const SignupPage = () => {
  // NOTE: Swap these with your authentic auth hook context if using an external state store (e.g., Zustand)
  const [isSignUp, setIsSignUp] = useState(false);
  const signUp = async (data) => {
    setIsSignUp(true);
    console.log("Signing up with: ", data);
    setTimeout(() => {
      setIsSignUp(false);
      toast.success("Account simulation successful!");
    }, 1500);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signUp(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black text-white relative overflow-hidden">
      
      {/* Visual Symmetry Radial Glow Ambient Effect */}
      <div className='absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-1/4 left-1/3 w-60 h-60 bg-mint-500/5 rounded-full blur-[100px] pointer-events-none' />

      {/* Left Side: Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 z-10 relative">
        <div className="w-full max-w-md space-y-8 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          
          {/* LOGO */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#A7F3D0]/20 to-[#10B981]/5 border border-white/[0.1] flex items-center justify-center shadow-[0_0_15px_rgba(167,243,208,0.1)] group-hover:scale-105 transition-transform duration-300">
              <MessagesSquare className="size-6 text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-3 text-white">Create Account</h1>
            <p className="text-gray-400 text-sm font-medium">Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 z-10 pl-3.5 flex items-center pointer-events-none">
                  <User className="size-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.1] focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] rounded-xl text-white placeholder-gray-500 font-medium outline-none transition-all duration-300"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 z-10 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.1] focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] rounded-xl text-white placeholder-gray-500 font-medium outline-none transition-all duration-300"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 z-10 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-11 py-3 bg-white/[0.04] border border-white/[0.1] focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] rounded-xl text-white placeholder-gray-500 font-medium outline-none transition-all duration-300"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-[#34D399] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-3 mt-2 bg-gradient-to-r from-[#A7F3D0] to-[#10B981] hover:from-[#86EFAC] hover:to-[#059669] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_25px_rgba(52,211,153,0.35)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2" 
              disabled={isSignUp}
            >
              {isSignUp ? (
                <>
                  <Loader className="size-5 animate-spin text-black" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Redirection Link */}
          <div className="text-center pt-2 border-t border-white/[0.06]">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-[#34D399] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Pattern Component */}
      <AuthImagePattern
        title="Join our community"
        Subtitle1="Connect with friends, share moments and stay in touch with your "
        subtitle2="loved ones !!."
      />
    </div>
  );
};

export default SignupPage;