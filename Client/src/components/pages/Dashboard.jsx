import { useState, useEffect } from 'react';
import { 
 Construction, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Send, 
  Terminal, 
  ExternalLink,
  ShieldCheck,
  MessagesSquare,
  Zap,
  Lock
} from 'lucide-react';

const Dashboard = () => {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('completed');
  const [terminalLogs, setTerminalLogs] = useState([
    "INFO: Initializing SplitSettle core components...",
    "SUCCESS: Glassmorphic UI layout integrated.",
    "SUCCESS: Pitch-black & Mint-green design rules injected.",
    "SUCCESS: Secure 6-digit OTP verification module verified."
  ]);

  // Simulated live logs to make the page feel functional and dynamic
  useEffect(() => {
    const freshLogs = [
      "DEBUG: Checking SMTP transport connection pool...",
      "INFO: Optimizing database indexing for multi-person ledger chains...",
      "SYSTEM: Deployment branch aligned with stable v1.1.0 release.",
      "DEBUG: Syncing secure Google OAuth token callbacks...",
      "SUCCESS: Dev pipeline integrity checked - 0 errors found."
    ];

    const interval = setInterval(() => {
      const randomLog = freshLogs[Math.floor(Math.random() * freshLogs.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTerminalLogs(prev => [...prev.slice(-4), `[${timestamp}] ${randomLog}`]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setIsSubscribed(true);
      setNotifyEmail('');
    }
  };

  const tasks = [
    { id: 1, title: "Frosted Glassmorphic Mint Theme", category: "completed", desc: "Premium aesthetic with balanced high-contrast accents completed across all views." },
    { id: 2, title: "6-Digit Secure OTP verification modal", category: "completed", desc: "Integrated multi-input transition auto-focusing code gates with inline countdowns." },
    { id: 3, title: "Google Single Sign-On module", category: "completed", desc: "Fully integrated GoogleOAuthProvider context handles." },
    { id: 4, title: "Real-time ledger engine integration", category: "pending", desc: "Connecting fast transaction indexing matrices to simplify group balance states." },
    { id: 5, title: "AI Split optimization algorithm", category: "pending", desc: "Developing state path solvers that reduce gross transactional chains into net payouts." },
    { id: 6, title: "Multi-currency bank-grade settlements", category: "pending", desc: "Integrating Plaid balances with local cross-border rails and web3 USDC options." },
  ];

  const filteredTasks = tasks.filter(t => t.category === activeTab);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative overflow-hidden font-sans p-6 md:p-12">
      
      {/* Premium Ambient Radial Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-[#10B981]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header Row */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#A7F3D0]/20 to-[#10B981]/5 border border-white/[0.1] flex items-center justify-center shadow-[0_0_15px_rgba(167,243,208,0.1)]">
            <Sparkles className="size-5 text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight block">SplitSettle</span>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Ecosystem Space</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-white/[0.02] border border-white/[0.08] px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <span className="size-2 rounded-full bg-[#34D399] animate-ping" />
          v1.1.0 Dev Active
        </div>
      </header>

      {/* Main Feature Content Container */}
      <main className="w-full max-w-4xl mx-auto my-auto z-10 relative py-12 space-y-12">
        
        {/* Core Notice and Header Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400">
            <Construction className="size-4 animate-spin" />
            Ecosystem Under Active Construction
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
            We are crafting <br />
            <span className="bg-gradient-to-r from-[#A7F3D0] to-[#10B981] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              The Next-Gen Split Engine
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            SplitSettle's underlying secure logic structures are compiling cleanly. We are actively sculpting live transactional ledgers and simplifying your multi-person debt networks.
          </p>
        </div>

        {/* Dynamic Glassmorphic Core Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Panel: Tasks Roadmap Tracker */}
          <div className="md:col-span-7 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="font-bold text-sm tracking-wide text-white">Milestone Register</h3>
                
                {/* Custom Segmented Tabs */}
                <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
                  <button 
                    onClick={() => setActiveTab('completed')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'completed' ? 'bg-[#34D399] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Completed
                  </button>
                  <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'pending' ? 'bg-[#34D399] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              {/* Task Cards Matrix */}
              <div className="space-y-3 min-h-[180px]">
                {filteredTasks.map(task => (
                  <div key={task.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-3 hover:border-white/[0.08] transition-colors">
                    {task.category === 'completed' ? (
                      <CheckCircle2 className="size-5 text-[#34D399] shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="size-5 text-gray-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white">{task.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-normal mt-0.5">{task.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Subscription & Simulated Live Logs */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Subscription Form card */}
            <div className="bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white">Be The First To Know</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Join our pool of developers and alpha testers. Get an automatic ping when SplitSettle dashboard interfaces deploy.
                </p>

                {isSubscribed ? (
                  <div className="bg-[#34D399]/10 border border-[#34D399]/20 p-4 rounded-2xl text-center space-y-1.5 animate-fadeIn">
                    <CheckCircle2 className="size-7 text-[#34D399] mx-auto" />
                    <h4 className="text-xs font-bold">Successfully Registered!</h4>
                    <p className="text-gray-400 text-[10px]">We will notify you instantly at launch.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNotifySubmit} className="space-y-2">
                    <div className="relative">
                      <input 
                        type="email"
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        required
                        placeholder="developer@splitsettle.io"
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-xs text-white rounded-xl py-3 pl-3 pr-10 outline-none focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] transition-all"
                      />
                      <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-1.5 p-2 bg-[#34D399] hover:bg-[#10B981] text-black rounded-lg transition-colors">
                        <Send className="size-3" />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 text-center">Spam-free direct delivery logs only.</p>
                  </form>
                )}
              </div>
            </div>

            {/* Live Developer console terminal logs */}
            <div className="bg-zinc-950/90 border border-white/[0.08] p-5 rounded-3xl font-mono text-[10px] text-gray-400 flex flex-col gap-2 shadow-inner relative flex-1 min-h-[140px]">
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-2 mb-1 shrink-0">
                <Terminal className="size-3.5 text-[#34D399]" />
                <span className="text-white text-[9px] font-bold uppercase tracking-wider">Dev Console Stream</span>
              </div>
              <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                {terminalLogs.map((log, i) => (
                  <p 
                    key={i} 
                    className={`truncate ${
                      log.includes('SUCCESS') ? 'text-[#34D399]' : log.includes('INFO') ? 'text-blue-400' : 'text-gray-400'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Branding Coordinates */}
      <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6 z-10 relative">
        <p className="text-[10px] text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} SplitSettle Technologies. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 hover:text-[#34D399] flex items-center gap-1 transition-colors">
            Source Control <ExternalLink className="size-3" />
          </a>
          <span className="text-gray-700 text-[10px]">|</span>
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            Built Secure <Lock className="size-3 text-[#34D399]" />
          </span>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;
