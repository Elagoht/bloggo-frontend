import { FC, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  IconSearch,
  IconTag,
  IconCategory,
  IconArticle,
  IconUser,
  IconLoader2,
} from "@tabler/icons-react";
import { searchGlobal } from "../../services/search";
import { LRUCache } from "../../utilities/lruCache";

interface SearchDropdownProps {
  placeholder?: string;
  className?: string;
}

const searchCache = new LRUCache<SearchResponse>(100);

const SearchDropdown: FC<SearchDropdownProps> = ({
  placeholder = "Search posts, categories, tags, users...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number>();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search function
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const trimmedQuery = query.trim();

      // Check cache first
      const cachedResult = searchCache.get(trimmedQuery);
      if (cachedResult) {
        setResults(cachedResult.results);
        setIsOpen(true);
        return;
      }

      // Perform search
      try {
        setIsLoading(true);
        setError(null);

        const response = await searchGlobal(trimmedQuery, 10);
        if (response.success) {
          // Cache the result
          searchCache.set(trimmedQuery, response.data);
          setResults(response.data.results);
          setIsOpen(true);
        } else {
          setError("Search failed");
          setResults([]);
        }
      } catch {
        setError("Search failed");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const getResultIcon = (type: SearchResultType) => {
    const iconProps = { className: "w-4 h-4" };

    switch (type) {
      case "tag":
        return <IconTag {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "category":
        return (
          <IconCategory {...iconProps} className="w-4 h-4 text-green-500" />
        );
      case "post":
        return (
          <IconArticle {...iconProps} className="w-4 h-4 text-purple-500" />
        );
      case "user":
        return <IconUser {...iconProps} className="w-4 h-4 text-orange-500" />;
      default:
        return <IconSearch {...iconProps} />;
    }
  };

  const getResultLink = (result: SearchResult): string => {
    switch (result.type) {
      case "tag":
        return `/tags/details/${result.slug}`;
      case "category":
        return `/categories/details/${result.slug}`;
      case "post":
        return `/posts/${result.slug}`;
      case "user":
        return `/users/details/${result.id}`;
      default:
        return "#";
    }
  };

  const getResultImage = (result: SearchResult) => {
    if (result.avatarUrl && result.type === "user") {
      return (
        <img
          src={import.meta.env.VITE_API_URL + result.avatarUrl}
          alt={result.title}
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }

    if (
      result.coverUrl &&
      (result.type === "category" || result.type === "post")
    ) {
      return (
        <img
          src={import.meta.env.VITE_API_URL + result.coverUrl}
          alt={result.title}
          className="w-8 h-8 rounded object-cover"
        />
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-smoke-100 dark:bg-smoke-800 flex items-center justify-center">
        {getResultIcon(result.type)}
      </div>
    );
  };

  const handleItemClick = () => {
    setIsOpen(false);
    setQuery("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleInputFocus = () => {
    if (results.length > 0 && query.trim().length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-smoke-400 dark:text-smoke-500">
          {isLoading ? (
            <IconLoader2 className="w-4 h-4 animate-spin" />
          ) : (
            <IconSearch className="w-4 h-4" />
          )}
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 h-8 rounded-full bg-smoke-100 dark:bg-smoke-900 border border-smoke-200/50 dark:border-smoke-700/50 text-smoke-900 dark:text-smoke-100 placeholder-smoke-400 dark:placeholder-smoke-500 text-sm focus:outline-none focus:border-gopher-300 dark:focus:border-gopher-600 focus:shadow-md transition-all"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {error ? (
            <div className="p-4 text-center text-danger-600 dark:text-danger-400">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-smoke-500 dark:text-smoke-400">
              No results found
            </div>
          ) : (
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={getResultLink(result)}
                  onClick={handleItemClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-smoke-50 dark:hover:bg-smoke-800 transition-colors"
                >
                  {getResultImage(result)}
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-smoke-900 dark:text-smoke-100 truncate block">
                      {result.title}
                    </span>
                    <div className="text-xs text-smoke-500 dark:text-smoke-400 capitalize">
                      {result.type}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
