import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter, Download, UserPlus, TrendingUp, Users, Briefcase, Sprout } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';
import { AddVoterDialog } from '../components/AddVoterDialog';

const voters = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    age: 42,
    gender: 'Male',
    booth: 'Booth 001',
    occupation: 'Business Owner',
    segment: 'Business',
    schemes: ['PM-MUDRA', 'GST Benefit'],
    engagement: 85,
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    booth: 'Booth 002',
    occupation: 'Teacher',
    segment: 'Youth',
    schemes: ['PM-Awas', 'LPG Subsidy'],
    engagement: 92,
    phone: '+91 98765 43211'
  },
  {
    id: 3,
    name: 'Mohan Singh',
    age: 55,
    gender: 'Male',
    booth: 'Booth 001',
    occupation: 'Farmer',
    segment: 'Farmer',
    schemes: ['PM-KISAN', 'Crop Insurance'],
    engagement: 78,
    phone: '+91 98765 43212'
  },
  {
    id: 4,
    name: 'Sunita Devi',
    age: 38,
    gender: 'Female',
    booth: 'Booth 003',
    occupation: 'Homemaker',
    segment: 'Women',
    schemes: ['Ujjwala', 'Jan Dhan'],
    engagement: 88,
    phone: '+91 98765 43213'
  },
  {
    id: 5,
    name: 'Amit Patel',
    age: 24,
    gender: 'Male',
    booth: 'Booth 004',
    occupation: 'Student',
    segment: 'Youth',
    schemes: ['Scholarship', 'Skill Development'],
    engagement: 95,
    phone: '+91 98765 43214'
  },
  {
    id: 6,
    name: 'Meena Reddy',
    age: 45,
    gender: 'Female',
    booth: 'Booth 002',
    occupation: 'Business Owner',
    segment: 'Women',
    schemes: ['MUDRA', 'Stand-Up India'],
    engagement: 82,
    phone: '+91 98765 43215'
  },
  {
    id: 7,
    name: 'Ramesh Yadav',
    age: 62,
    gender: 'Male',
    booth: 'Booth 005',
    occupation: 'Farmer',
    segment: 'Farmer',
    schemes: ['PM-KISAN', 'Pension Scheme'],
    engagement: 70,
    phone: '+91 98765 43216'
  },
  {
    id: 8,
    name: 'Anita Verma',
    age: 31,
    gender: 'Female',
    booth: 'Booth 003',
    occupation: 'IT Professional',
    segment: 'Youth',
    schemes: ['Health Insurance', 'Tax Benefits'],
    engagement: 90,
    phone: '+91 98765 43217'
  },
];

const segmentStats = [
  { name: 'Youth Voters', value: 35, count: 85987, icon: Users, color: '#3b82f6' },
  { name: 'Farmers', value: 22, count: 54034, icon: Sprout, color: '#10b981' },
  { name: 'Women Voters', value: 48, count: 117926, icon: Users, color: '#ec4899' },
  { name: 'Business Owners', value: 15, count: 36852, icon: Briefcase, color: '#f59e0b' },
];

const ageDistribution = [
  { range: '18-25', count: 45680 },
  { range: '26-35', count: 62340 },
  { range: '36-45', count: 54230 },
  { range: '46-55', count: 48760 },
  { range: '56-65', count: 24580 },
  { range: '65+', count: 10090 },
];

const occupationData = [
  { name: 'Farmer', value: 22, color: '#10b981' },
  { name: 'Business', value: 15, color: '#f59e0b' },
  { name: 'Employed', value: 35, color: '#3b82f6' },
  { name: 'Self-Employed', value: 18, color: '#8b5cf6' },
  { name: 'Others', value: 10, color: '#6b7280' },
];

export default function VoterIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSegment, setFilterSegment] = useState('all');
  const [filterBooth, setFilterBooth] = useState('all');
  const [isAddVoterDialogOpen, setIsAddVoterDialogOpen] = useState(false);

  const handleExportData = () => {
    toast.success('Exporting voter data... Download will start shortly!');
    // In production, this would generate and download a CSV/Excel file
  };

  const handleAddVoter = () => {
    setIsAddVoterDialogOpen(true);
  };

  const filteredVoters = voters.filter(voter => {
    const matchesSearch = voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         voter.phone.includes(searchQuery);
    const matchesSegment = filterSegment === 'all' || voter.segment === filterSegment;
    const matchesBooth = filterBooth === 'all' || voter.booth === filterBooth;
    return matchesSearch && matchesSegment && matchesBooth;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Voter Intelligence</h1>
          <p className="text-gray-600 mt-1">Comprehensive voter data analytics and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddVoter}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Voter
          </Button>
        </div>
      </div>

      {/* Segment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segmentStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.count.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                />
              </div>
              <span className="text-sm font-medium">{stat.value}%</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Occupation Breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Occupation Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={occupationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {occupationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Voter List */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or phone..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterSegment} onValueChange={setFilterSegment}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="Youth">Youth</SelectItem>
              <SelectItem value="Farmer">Farmer</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBooth} onValueChange={setFilterBooth}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by booth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Booths</SelectItem>
              <SelectItem value="Booth 001">Booth 001</SelectItem>
              <SelectItem value="Booth 002">Booth 002</SelectItem>
              <SelectItem value="Booth 003">Booth 003</SelectItem>
              <SelectItem value="Booth 004">Booth 004</SelectItem>
              <SelectItem value="Booth 005">Booth 005</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Age/Gender</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Booth</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Segment</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Schemes</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Engagement</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map((voter) => (
                <tr key={voter.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-sm">{voter.name}</p>
                      <p className="text-xs text-gray-500">{voter.phone}</p>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{voter.age} / {voter.gender}</td>
                  <td className="p-3 text-sm">{voter.booth}</td>
                  <td className="p-3">
                    <Badge variant="outline">{voter.segment}</Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {voter.schemes.slice(0, 2).map((scheme, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {scheme}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                        <div 
                          className={`h-2 rounded-full ${
                            voter.engagement >= 85 ? 'bg-green-500' :
                            voter.engagement >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${voter.engagement}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{voter.engagement}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredVoters.map((voter) => (
            <Card key={voter.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{voter.name}</h4>
                  <p className="text-sm text-gray-500">{voter.age} yrs, {voter.gender}</p>
                </div>
                <Badge variant="outline">{voter.segment}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booth:</span>
                  <span className="font-medium">{voter.booth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement:</span>
                  <span className="font-medium">{voter.engagement}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {voter.schemes.map((scheme, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {scheme}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {filteredVoters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No voters found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Add Voter Dialog */}
      <AddVoterDialog open={isAddVoterDialogOpen} onOpenChange={setIsAddVoterDialogOpen} />
    </div>
  );
}