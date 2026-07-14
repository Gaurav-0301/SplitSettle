

const AuthImagePattern = ({ title, Subtitle1, subtitle2 }) => {
  return (
    <div className='hidden lg:flex items-center justify-center relative bg-black p-12 overflow-hidden h-screen w-full'>
      {/* Dynamic Background Green Glows */}
      <div className='absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none' />
      <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-mint-500/15 rounded-full blur-[120px] pointer-events-none' />

      <div className='max-w-md text-center z-10'>
        {/* White-Based Glassmorphic Grid Container */}
        <div className='grid grid-cols-3 gap-4 mb-10 p-6 bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl rounded-3xl shadow-[0_25px_50px_-12px_rgba(255,255,255,0.02)]'>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl transition-all duration-700 ${
                i % 2 === 0 
                  ? "bg-gradient-to-br from-[#A7F3D0]/25 to-[#10B981]/5 animate-pulse shadow-[0_0_15px_rgba(167,243,208,0.15)]" 
                  : "bg-white/[0.05] border border-white/[0.08]"
              }`}
            />
          ))}
        </div>

        {/* Typography */}
        <h2 className='text-3xl font-extrabold tracking-tight text-white mb-3'>
          {title}
        </h2>
        <p className='text-gray-400 text-sm leading-relaxed font-medium px-4'>
          {Subtitle1}{' '}
          <span className='text-[#ea4cab] font-semibold drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]'>
            {subtitle2}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;