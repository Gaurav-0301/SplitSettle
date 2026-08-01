import { useEffect, useState } from 'react';
import { MessagesSquare, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { Link, replace, useNavigate } from 'react-router-dom';
import AuthImagePattern from './AuthImage';
import OtpModal from './OtpModal';
import GoogleAuthWrapper from './GoogleAuthWrapper';
import { authStore } from '../store/AuthStore';

const LoginPage = () => {
  const {signIn, verifyOtp,isSignIn,isAuthenticated} = authStore();
  const [isLoggingIn,setIsLoggingIn]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate=useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsLoggingIn(true);
      signIn(formData);
      
    }else{
      setIsLoggingIn(false);
    }
  };

   useEffect(() => {
    if (isSignIn) {
      setShowOtpModal(true);
      setIsLoggingIn(false)
    } else {
      setShowOtpModal(false);
      setIsLoggingIn(false);
    }
  }, [isSignIn]);



  const handleVerifyOtp = async (otpCode) => {
  try {
    await verifyOtp({
      ...formData,
      otp: otpCode,
    });

    setShowOtpModal(false);
  } catch (error) {
    console.error(error);
  }
};

useEffect(()=>{
  if(isAuthenticated){
    navigate("/groups" ,{replace:true});
  }
},[navigate,isAuthenticated])

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black text-white relative overflow-hidden">
      {/* Background Ambience Glow elements */}
      <div className='absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-1/4 left-1/3 w-60 h-60 bg-mint-500/5 rounded-full blur-[100px] pointer-events-none' />

      {/* Main Authentication Input Panel Area */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 z-10 relative">
        <div className="w-full max-w-md space-y-8 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          
          {/* Logo Frame */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#A7F3D0]/20 to-[#10B981]/5 border border-white/[0.1] flex items-center justify-center shadow-[0_0_15px_rgba(167,243,208,0.1)] transition-transform duration-300">
              <MessagesSquare className="size-6 text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-3">Welcome Back</h1>
            <p className="text-gray-400 text-sm font-medium">Sign in to continue your session</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Email Field Container */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 z-10 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.1] focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] rounded-xl text-white outline-none transition-all duration-300"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field Container */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 z-10 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-11 py-3 bg-white/[0.04] border border-white/[0.1] focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] rounded-xl text-white outline-none transition-all duration-300"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-[#34D399]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button
  type="submit"
  disabled={isLoggingIn}
  className="w-full py-3 mt-2 bg-gradient-to-r from-[#A7F3D0] to-[#10B981] hover:from-[#86EFAC] hover:to-[#059669] text-black font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
>
  {isLoggingIn ? (
    <>
      <span className="loading loading-spinner loading-sm"></span>
      Sending OTP...
    </>
  ) : (
    "Login"
  )}
</button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/[0.08]"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500 tracking-widest uppercase">or</span>
            <div className="flex-grow border-t border-white/[0.08]"></div>
          </div>

          <GoogleAuthWrapper />

          <div className="text-center pt-2">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#34D399] font-semibold hover:underline">Create account</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back!"
        Subtitle1="Sign in to continue your conversations and catch up with your "
        subtitle2="Friends & Loved ones !!."
      />

      {/* Extracted Glassmorphic OTP Layer Component */}
      <OtpModal 
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={formData.email}
        onVerify={handleVerifyOtp}
        isLoggingIn={isLoggingIn}
      />
    </div>
  );
};

export default LoginPage;