import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '.js';
import { Badge } from '.js';
import { Search, Users, MapPin, UserCheck, Construction, TrendingUp, X } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'voter' | 'booth' | 'worker' | 'project' | 'report';
  title: string;
  subtitle: string;
  link: string;
}

const mockSearchData: SearchResult[] = [
  { id: '1', type: 'voter', title: 'Rajesh Kumar', subtitle: 'Booth 001 - Gandhi Nagar', link: '/dashboard/voter-intelligence' },
  { id: '2', type: 'voter', title: 'Priya Sharma', subtitle: 'Booth 003 - Central Market', link: '/dashboard/voter-intelligence' },
  { id: '3', type: 'booth', title: 'Booth 001 - Gandhi Nagar', subtitle: '1,234 voters', link: '/dashboard/booth-management' },
  { id: '4', type: 'booth', title: 'Booth 005 - Green Valley', subtitle: '1,987 voters', link: '/dashboard/booth-management' },
  { id: '5', type: 'worker', title: 'Suresh Kumar', subtitle: 'Field Coordinator - Booth 002', link: '/dashboard/worker-management' },
  { id: '6', type: 'worker', title: 'Amit Verma', subtitle: 'Booth Manager - Booth 004', link: '/dashboard/worker-management' },
  { id: '7', type: 'project', title: 'Main Road Construction', subtitle: 'Ward 5 - 65% complete', link: '/dashboard/development-tracker' },
  { id: '8', type: 'project', title: 'Water Supply Project', subtitle: 'Ward 3 - Planning stage', link: '/dashboard/development-tracker' },
  { id: '9', type: 'report', title: 'Monthly Voter Analysis', subtitle: 'Analytics Report', link: '/dashboard/reports' },
  { id: '10', type: 'report', title: 'Sentiment Trends Report', subtitle: 'Analytics Report', link: '/dashboard/reports' },
];

export function GlobalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.link);
    setQuery('');
    setIsOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voter':
        return <Users className="w-4 h-4" />;
      case 'booth':
        return <MapPin className="w-4 h-4" />;
      case 'worker':
        return <UserCheck className="w-4 h-4" />;
      case 'project':
        return <Construction className="w-4 h-4" />;
      case 'report':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      voter: 'bg-blue-100 text-blue-700',
      booth: 'bg-green-100 text-green-700',
      worker: 'bg-purple-100 text-purple-700',
      project: 'bg-orange-100 text-orange-700',
      report: 'bg-gray-100 text-gray-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search voters, booths, workers..."
          className="pl-9 pr-9 bg-gray-50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-2">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeBadge(result.type)}`}>
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{result.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{result.subtitle}</p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {result.type}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-8 text-center z-50">
            <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-gray-600">No results found for "{query}"</p>
            <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
          </div>
        </>
      )}
    </div>
  );
}
