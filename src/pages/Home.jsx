import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const { jobs, searchQuery, filters, sort, pagination } = useSelector(state => state.jobs);

  const filteredAndSortedJobs = useMemo(() => {
    let result = [...jobs];

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(lowerQuery) || 
        job.description.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery)
      );
    }

    
    if (filters.company) {
      result = result.filter(job => job.company === filters.company);
    }

    
    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }


    result.sort((a, b) => {
      if (sort === 'date') {
        return new Date(b.datePosted) - new Date(a.datePosted);
      } else if (sort === 'salary') {
        return b.salary - a.salary;
      }
      return 0;
    });

    return result;
  }, [jobs, searchQuery, filters, sort]);

  
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(startIndex, startIndex + pagination.itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Find Your Next Role</h1>
        <p className="text-slate-400">Discover and apply to top remote and local opportunities.</p>
      </div>

      <FilterBar />

      {filteredAndSortedJobs.length === 0 ? (
        <div className="text-center py-12 bg-neutral-800 rounded-xl border border-neutral-700">
          <p className="text-slate-400 text-lg">No jobs found matching your criteria.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-accent hover:text-accent-light font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {paginatedJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <Pagination totalItems={filteredAndSortedJobs.length} />
        </>
      )}
    </div>
  );
}
