import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/jobs/jobsSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ totalItems }) {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(state => state.jobs.pagination);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => dispatch(setPage(currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-slate-300 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-1">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => dispatch(setPage(page))}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page 
                ? 'bg-accent text-white border border-accent' 
                : 'bg-neutral-800 border border-neutral-700 text-slate-300 hover:bg-neutral-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => dispatch(setPage(currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-slate-300 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
