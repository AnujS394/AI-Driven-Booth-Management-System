import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  MapPin, 
  X, 
  Search, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Navigation,
  Filter,
  Users,
  Building,
  Construction,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const locations = [
  { id: 1, name: 'Booth 001 - Gandhi Nagar', type: 'booth', lat: 28.7041, lng: 77.1025, voters: 1234, status: 'Active', workers: 5 },
  { id: 2, name: 'Booth 002 - Nehru Park', type: 'booth', lat: 28.7141, lng: 77.1125, voters: 982, status: 'Active', workers: 4 },
  { id: 3, name: 'Booth 003 - Central Market', type: 'booth', lat: 28.6941, lng: 77.0925, voters: 1456, status: 'Active', workers: 6 },
  { id: 4, name: 'Main Road Construction', type: 'project', lat: 28.7041, lng: 77.1225, status: 'In Progress', completion: 65 },
  { id: 5, name: 'Community Center', type: 'project', lat: 28.6841, lng: 77.1025, status: 'Completed', completion: 100 },
  { id: 6, name: 'Water Supply Project', type: 'project', lat: 28.7141, lng: 77.0825, status: 'Planned', completion: 0 },
  { id: 7, name: 'Campaign Office', type: 'office', lat: 28.7041, lng: 77.1125, staff: 12 },
  { id: 8, name: 'Voter Rally Point', type: 'event', lat: 28.6941, lng: 77.1225, date: 'March 15, 2026' },
];

export default function MapView() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locations.filter(loc => {
    const matchesType = filterType === 'all' || loc.type === filterType;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'booth': return 'bg-blue-500';
      case 'project': return 'bg-green-500';
      case 'office': return 'bg-purple-500';
      case 'event': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Planned':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <X className="w-4 h-4 mr-2" />
            Close Map
          </Button>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold">Interactive Map View</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="w-4 h-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline" size="sm">
            <Navigation className="w-4 h-4 mr-2" />
            My Location
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search locations..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="booth">Booths</SelectItem>
                  <SelectItem value="project">Projects</SelectItem>
                  <SelectItem value="office">Offices</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Legend */}
            <Card className="p-3 bg-gray-50">
              <p className="text-sm font-medium mb-3">Legend</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Voting Booths</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Development Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Campaign Offices</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Events</span>
                </div>
              </div>
            </Card>

            {/* Locations List */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Locations ({filteredLocations.length})</p>
              {filteredLocations.map((location) => (
                <Card 
                  key={location.id}
                  className={`p-3 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedLocation?.id === location.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getMarkerColor(location.type)} flex items-center justify-center text-white flex-shrink-0`}>
                      {location.type === 'booth' && <MapPin className="w-5 h-5" />}
                      {location.type === 'project' && <Construction className="w-5 h-5" />}
                      {location.type === 'office' && <Building className="w-5 h-5" />}
                      {location.type === 'event' && <Users className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{location.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {location.type}
                        </Badge>
                        {location.status && (
                          <Badge variant="secondary" className="text-xs">
                            {getStatusIcon(location.status)}
                            <span className="ml-1">{location.status}</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100">
          {/* Mock Map Display */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>

            {/* Map Markers */}
            <div className="absolute inset-0 p-20">
              {filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={`absolute ${getMarkerColor(location.type)} w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                  style={{
                    left: `${20 + (index % 4) * 25}%`,
                    top: `${20 + Math.floor(index / 4) * 25}%`,
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <MapPin className="w-5 h-5" />
                </div>
              ))}
            </div>

            {/* Selected Location Info Card */}
            {selectedLocation && (
              <Card className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-96 p-4 shadow-2xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full ${getMarkerColor(selectedLocation.type)} flex items-center justify-center text-white flex-shrink-0`}>
                      {selectedLocation.type === 'booth' && <MapPin className="w-6 h-6" />}
                      {selectedLocation.type === 'project' && <Construction className="w-6 h-6" />}
                      {selectedLocation.type === 'office' && <Building className="w-6 h-6" />}
                      {selectedLocation.type === 'event' && <Users className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                      <Badge className="mt-1 capitalize">{selectedLocation.type}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {selectedLocation.voters && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Voters</span>
                      <span className="font-bold">{selectedLocation.voters.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedLocation.workers && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Active Workers</span>
                      <span className="font-bold">{selectedLocation.workers}</span>
                    </div>
                  )}
                  {selectedLocation.status && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <Badge variant="secondary">
                        {getStatusIcon(selectedLocation.status)}
                        <span className="ml-1">{selectedLocation.status}</span>
                      </Badge>
                    </div>
                  )}
                  {selectedLocation.completion !== undefined && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-bold">{selectedLocation.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all" 
                          style={{ width: `${selectedLocation.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {selectedLocation.staff && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Staff Members</span>
                      <span className="font-bold">{selectedLocation.staff}</span>
                    </div>
                  )}
                  {selectedLocation.date && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Event Date</span>
                      <span className="font-bold">{selectedLocation.date}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Get Directions
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Map Controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="bg-white shadow-lg">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-white shadow-lg">
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Map Info */}
          <div className="absolute left-4 top-4 bg-white px-3 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-medium">Delhi NCR - Campaign Area</p>
          </div>
        </div>
      </div>
    </div>
  );
}
