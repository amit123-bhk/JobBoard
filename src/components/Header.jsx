import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Header() {
  const location = useLocation();
  const bookmarks = useSelector(state => state.jobs.bookmarks);

  return (
    <header className="bg-neutral-800 border-b border-neutral-700 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors">
          <Briefcase size={28} />
          <span className="text-xl font-bold text-white tracking-tight">JobBoard</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${location.pathname === '/' ? 'text-accent-light' : 'text-slate-300 hover:text-white'}`}
          >
            Find Jobs
          </Link>
          <Link 
            to="/bookmarks" 
            className={`flex items-center gap-2 font-medium transition-colors ${location.pathname === '/bookmarks' ? 'text-accent-light' : 'text-slate-300 hover:text-white'}`}
          >
            <Bookmark size={20} />
            Bookmarks
            {bookmarks.length > 0 && (
              <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                {bookmarks.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
