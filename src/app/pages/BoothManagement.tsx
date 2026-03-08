import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Users, Filter, TrendingUp, AlertCircle, Map } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FiltersDialog } from '../components/FiltersDialog';
import { toast } from 'sonner';

const booths = [
  {
    id: 1,
    name: 'Booth 001 - Gandhi Nagar',
    totalVoters: 1856,
    workers: 8,
    engagement: 85,
    sentiment: 78,
    beneficiaries: 456,
    zone: 'North',
    keyInfluencers: 12,
    segments: { youth: 35, middleAge: 40, senior: 25 }
  },
  {
    id: 2,
    name: 'Booth 002 - Market Area',
    totalVoters: 2145,
    workers: 10,
    engagement: 72,
    sentiment: 65,
    beneficiaries: 589,
    zone: 'Central',
    keyInfluencers: 15,
    segments: { youth: 42, middleAge: 38, senior: 20 }
  },
  {
    id: 3,
    name: 'Booth 003 - Station Road',
    totalVoters: 1678,
    workers: 7,
    engagement: 90,
    sentiment: 82,
    beneficiaries: 402,
    zone: 'South',
    keyInfluencers: 10,
    segments: { youth: 38, middleAge: 42, senior: 20 }
  },
  {
    id: 4,
    name: 'Booth 004 - College Area',
    totalVoters: 2456,
    workers: 12,
    engagement: 88,
    sentiment: 80,
    beneficiaries: 678,
    zone: 'East',
    keyInfluencers: 18,
    segments: { youth: 55, middleAge: 30, senior: 15 }
  },
  {
    id: 5,
    name: 'Booth 005 - Industrial Zone',
    totalVoters: 1934,
    workers: 9,
    engagement: 68,
    sentiment: 62,
    beneficiaries: 523,
    zone: 'West',
    keyInfluencers: 14,
    segments: { youth: 32, middleAge: 48, senior: 20 }
  },
];

export default function BoothManagement() {
  const [selectedBooth, setSelectedBooth] = useState(booths[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);
  const navigate = useNavigate();

  const segmentChartData = [
    { name: 'Youth (18-35)', value: selectedBooth.segments.youth, color: '#3b82f6' },
    { name: 'Middle Age (36-55)', value: selectedBooth.segments.middleAge, color: '#10b981' },
    { name: 'Senior (55+)', value: selectedBooth.segments.senior, color: '#f59e0b' },
  ];

  const engagementData = [
    { metric: 'Voter Contact', value: 85 },
    { metric: 'Issue Resolution', value: 72 },
    { metric: 'Event Participation', value: 68 },
    { metric: 'Social Media', value: 75 },
  ];

  const filteredBooths = booths.filter(booth => 
    booth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booth.zone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booth Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all polling booth operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFiltersDialogOpen(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/dashboard/map-view')}>
            <Map className="w-4 h-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Booth List */}
        <Card className="lg:col-span-1 p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search booths..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredBooths.map((booth) => (
              <div
                key={booth.id}
                onClick={() => setSelectedBooth(booth)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedBooth.id === booth.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{booth.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {booth.zone}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Voters:</span>
                    <span className="font-medium">{booth.totalVoters.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Workers:</span>
                    <span className="font-medium">{booth.workers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement:</span>
                    <span className={`font-medium ${
                      booth.engagement >= 80 ? 'text-green-600' :
                      booth.engagement >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {booth.engagement}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Panel - Booth Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booth Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Voters</p>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">{selectedBooth.totalVoters.toLocaleString()}</h3>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Engagement</p>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">{selectedBooth.engagement}%</h3>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Beneficiaries</p>
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold">{selectedBooth.beneficiaries}</h3>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Sentiment</p>
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold">{selectedBooth.sentiment}%</h3>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voter Segmentation */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Voter Segmentation</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={segmentChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {segmentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {segmentChartData.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span className="text-gray-600">{segment.name}</span>
                    </div>
                    <span className="font-medium">{segment.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Engagement Metrics */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Engagement Metrics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Key Influencers and Workers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Key Influencers ({selectedBooth.keyInfluencers})</h3>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">Influencer {index + 1}</p>
                        <p className="text-xs text-gray-500">Reach: {(Math.random() * 500 + 200).toFixed(0)} voters</p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Assigned Workers ({selectedBooth.workers})</h3>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                        W{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">Worker {index + 1}</p>
                        <p className="text-xs text-gray-500">{(Math.random() * 50 + 20).toFixed(0)} visits today</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Performance</p>
                      <p className="font-medium text-sm text-green-600">{(Math.random() * 20 + 75).toFixed(0)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Booth Alerts & Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Low engagement in senior voter segment</p>
                  <p className="text-xs text-gray-600 mt-1">Consider organizing a senior citizens meet</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">2 new scheme beneficiaries added</p>
                  <p className="text-xs text-gray-600 mt-1">Update voter database and contact them</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters Dialog */}
      <FiltersDialog 
        open={filtersDialogOpen} 
        onOpenChange={setFiltersDialogOpen}
        context="booths"
        onApplyFilters={(filters) => {
          console.log('Applied filters:', filters);
          // Here you would filter the booths based on the applied filters
        }}
      />
    </div>
  );
}