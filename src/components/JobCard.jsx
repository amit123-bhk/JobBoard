import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../features/jobs/jobsSlice';
import { Bookmark, MapPin, Building, IndianRupee, Clock } from 'lucide-react';

export default function JobCard({ job }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.jobs.bookmarks);
  const isBookmarked = bookmarks.includes(job.id);

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(salary);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 transition-all hover:border-neutral-600 hover:shadow-md group relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-accent transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Building size={16} />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {job.location}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => dispatch(toggleBookmark(job.id))}
          className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-accent/20 text-accent' : 'bg-neutral-700 text-slate-400 hover:text-white hover:bg-neutral-600'}`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="text-slate-300 mb-6 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
            <IndianRupee size={14} />
            {formatSalary(job.salary)}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700/50 text-slate-300 text-sm font-medium rounded-full border border-neutral-600">
            {job.type}
          </span>
        </div>
        <span className="flex items-center gap-1 text-sm text-slate-500">
          <Clock size={14} />
          {formatDate(job.datePosted)}
        </span>
      </div>
    </div>
  );
}
