import { LogOut, ReceiptText, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authStore } from '../store/AuthStore';

const Navbar = () => {
  const { logout, isAuthenticated } = authStore();

  return (
    <>
      <header 
        className='bg-[#000001] border-b border-emerald-900/45 fixed w-full top-0 z-40 backdrop-blur-lg bg-[#000001] text-emerald-400 shadow-lg shadow-emerald-950/20'
      >
        <div className='container mx-auto px-4 h-16'>
          <div className='flex items-center justify-between h-full'>
            <div className='flex items-center gap-8 pl-6'>
              <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                <div className='w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20'>
                  <ReceiptText className='w-5 h-5 text-emerald-400'/>
                </div>
                <h1 className='text-lg font-bold tracking-wide text-emerald-400'>SplitSettle</h1>
              </Link>
            </div>

           
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar;