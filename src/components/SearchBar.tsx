import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { mockApi } from '../services/mockApi';
import { LazyImage } from './LazyImage';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      setIsLoading(true);
      const results = await mockApi.search(value);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery, handleSearch]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
      </div>

      {isLoading && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 animate-pulse" role="status">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      )}

      {searchResults && debouncedQuery && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto" role="listbox">
          {searchResults.posts.map((post: any) => (
            <div key={post.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700" role="option">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.content}</p>
            </div>
          ))}
          {searchResults.users.map((user: any) => (
            <div key={user.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700" role="option">
              <div className="flex items-center space-x-2">
                <LazyImage src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}