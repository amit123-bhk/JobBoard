import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setFilter, setSort } from '../features/jobs/jobsSlice';
import { Search, MapPin, Building, ArrowDownUp } from 'lucide-react';

export default function FilterBar() {
  const dispatch = useDispatch();
  const { searchQuery, filters, sort, jobs } = useSelector(state => state.jobs);

  // Extract unique companies and locations for dropdowns
  const companies = [...new Set(jobs.map(job => job.company))].sort();
  const locations = [...new Set(jobs.map(job => job.location))].sort();

  return (
    <div className="bg-neutral-800 p-4 rounded-xl shadow-md border border-neutral-700 flex flex-col md:flex-row gap-4 mb-8">
      
      {/* Search */}
      <div className="flex-grow relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search job titles or descriptions..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full bg-neutral-900 border border-neutral-600 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
      </div>

      {/* Filters & Sort Container */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Company Filter */}
        <div className="relative min-w-[160px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Building size={18} />
          </div>
          <select
            value={filters.company}
            onChange={(e) => dispatch(setFilter({ company: e.target.value }))}
            className="w-full bg-neutral-900 border border-neutral-600 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
          >
            <option value="">All Companies</option>
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Location Filter */}
        <div className="relative min-w-[160px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MapPin size={18} />
          </div>
          <select
            value={filters.location}
            onChange={(e) => dispatch(setFilter({ location: e.target.value }))}
            className="w-full bg-neutral-900 border border-neutral-600 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Sort */}
        <div className="relative min-w-[160px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <ArrowDownUp size={18} />
          </div>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="w-full bg-neutral-900 border border-neutral-600 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
          >
            <option value="date">Date Posted (Newest)</option>
            <option value="salary">Salary (Highest)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
