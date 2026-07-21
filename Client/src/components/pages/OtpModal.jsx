import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Loader } from 'lucide-react';
import { authStore } from '../store/AuthStore';

const OtpModal = ({ isOpen, onClose, email, onVerify, isAuthenticated }) => {
  // Configured to support a 6-digit verification pin layout
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const {resendOtp}=authStore();
  

  useEffect(() => {
    let interval = null;
    if (isOpen && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;

    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus move logic targeted for array lengths up to index 5
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      if (!otp[index] && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResendOtp = () => {
    if(canResend){
      resendOtp({email});
    }
    if (!canResend) return;
    setTimer(120);
    setCanResend(false);
    setOtp(new Array(6).fill(""));
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-zinc-950/80 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl space-y-6 text-center">
        
        <div className="flex flex-col items-center space-y-2">
          <div className="size-12 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 flex items-center justify-center mb-1">
            <ShieldCheck className="size-6 text-[#34D399]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Security Verification</h2>
          <p className="text-gray-400 text-xs px-4">
            We sent a 6-digit verification pin code to <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onVerify(otp.join("")); }} className="space-y-6">
          <div className="flex justify-between gap-2 max-w-xs mx-auto">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 bg-white/[0.04] border border-white/10 focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] text-center text-xl font-bold rounded-xl text-white outline-none transition-all duration-200"
              />
            ))}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isAuthenticated || otp.join("").length < 6}
              className="w-full py-3 bg-gradient-to-r from-[#A7F3D0] to-[#10B981] disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-black font-bold rounded-xl active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isAuthenticated ? <><Loader className="size-5 animate-spin" /> Verifying...</> : "Verify & Sign In"}
            </button>

            <button type="button" onClick={onClose} className="w-full py-2 bg-transparent text-gray-400 hover:text-white text-sm font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </form>

        <div className="text-sm font-medium border-t border-white/[0.06] pt-4">
          {canResend ? (
            <p className="text-gray-400">
              Didn't receive the code?{" "}
              <button onClick={handleResendOtp} className="text-[#34D399] font-bold hover:underline cursor-pointer">Resend Code</button>
            </p>
          ) : (
            <p className="text-gray-500">
              Resend code available in <span className="text-[#34D399] font-semibold">{formatTime(timer)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;