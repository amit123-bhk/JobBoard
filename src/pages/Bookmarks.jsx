import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { ArrowLeft, BookmarkX } from 'lucide-react';

export default function Bookmarks() {
  const { jobs, bookmarks } = useSelector(state => state.jobs);
  
  const bookmarkedJobs = jobs.filter(job => bookmarks.includes(job.id));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          to="/" 
          className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-slate-300 hover:text-white hover:bg-neutral-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Your Bookmarks</h1>
          <p className="text-slate-400">Manage your job opportunities</p>
        </div>
      </div>

      {bookmarkedJobs.length === 0 ? (
        <div className="text-center py-16 bg-neutral-800 rounded-xl border border-neutral-700 flex flex-col items-center">
          <div className="bg-neutral-700/50 p-4 rounded-full mb-4 text-slate-400">
            <BookmarkX size={32} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No bookmarks yet</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            When you see a job you like, click the bookmark icon to save it here for later
          </p>
          <Link 
            to="/" 
            className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            Find Jobs
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookmarkedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
