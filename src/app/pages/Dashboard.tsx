import { Card } from '../components/ui/card';
import { Users, MapPin, UserCheck, TrendingUp, Gift, Radio, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const statsCards = [
  { 
    title: 'Total Voters', 
    value: '2,45,680', 
    change: '+2.5%', 
    trend: 'up',
    icon: Users, 
    color: 'bg-blue-500' 
  },
  { 
    title: 'Active Booths', 
    value: '156', 
    change: '+12', 
    trend: 'up',
    icon: MapPin, 
    color: 'bg-green-500' 
  },
  { 
    title: 'Workers Assigned', 
    value: '1,248', 
    change: '+8.3%', 
    trend: 'up',
    icon: UserCheck, 
    color: 'bg-purple-500' 
  },
  { 
    title: 'Sentiment Score', 
    value: '74.2%', 
    change: '-1.2%', 
    trend: 'down',
    icon: TrendingUp, 
    color: 'bg-orange-500' 
  },
  { 
    title: 'Scheme Beneficiaries', 
    value: '89,456', 
    change: '+15.7%', 
    trend: 'up',
    icon: Gift, 
    color: 'bg-teal-500' 
  },
  { 
    title: 'Campaign Reach', 
    value: '1.8M', 
    change: '+23.4%', 
    trend: 'up',
    icon: Radio, 
    color: 'bg-pink-500' 
  },
];

const voterSegmentData = [
  { name: 'Youth (18-35)', value: 35, color: '#3b82f6' },
  { name: 'Middle Age (36-55)', value: 40, color: '#10b981' },
  { name: 'Senior (55+)', value: 25, color: '#f59e0b' },
];

const boothPerformanceData = [
  { booth: 'Booth 1', engagement: 85, turnout: 78 },
  { booth: 'Booth 2', engagement: 72, turnout: 68 },
  { booth: 'Booth 3', engagement: 90, turnout: 85 },
  { booth: 'Booth 4', engagement: 68, turnout: 65 },
  { booth: 'Booth 5', engagement: 88, turnout: 82 },
  { booth: 'Booth 6', engagement: 75, turnout: 72 },
];

const sentimentTrendData = [
  { date: 'Jan', positive: 65, negative: 20, neutral: 15 },
  { date: 'Feb', positive: 68, negative: 18, neutral: 14 },
  { date: 'Mar', positive: 72, negative: 16, neutral: 12 },
  { date: 'Apr', positive: 70, negative: 19, neutral: 11 },
  { date: 'May', positive: 74, negative: 15, neutral: 11 },
  { date: 'Jun', positive: 76, negative: 14, neutral: 10 },
];

const geographicData = [
  { region: 'North Zone', voters: 45000, engagement: 82 },
  { region: 'South Zone', voters: 52000, engagement: 76 },
  { region: 'East Zone', voters: 38000, engagement: 88 },
  { region: 'West Zone', voters: 48000, engagement: 79 },
  { region: 'Central Zone', voters: 62680, engagement: 85 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Real-time campaign analytics and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voter Segmentation */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Voter Segmentation by Age</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={voterSegmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {voterSegmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Booth Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Booth Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={boothPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="booth" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="engagement" fill="#3b82f6" name="Engagement %" />
              <Bar dataKey="turnout" fill="#10b981" name="Expected Turnout %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sentiment Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sentiment Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" name="Positive" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Neutral" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" name="Negative" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Geographic Heatmap */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Geographic Distribution & Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geographicData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="voters" fill="#6366f1" name="Total Voters" />
              <Bar dataKey="engagement" fill="#ec4899" name="Engagement Score" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { time: '10 mins ago', action: 'New voter registration in Booth 45', type: 'info' },
            { time: '25 mins ago', action: 'Worker completed 15 house visits in East Zone', type: 'success' },
            { time: '1 hour ago', action: 'Negative sentiment spike detected in Central Zone', type: 'warning' },
            { time: '2 hours ago', action: 'Campaign message delivered to 5,000 voters', type: 'success' },
            { time: '3 hours ago', action: 'Development work completed: Road in Ward 12', type: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-orange-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
