import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toast } from 'sonner';

const sentimentOverview = [
  { label: 'Positive', value: 74.2, count: 18234, trend: 'up', change: '+2.3%' },
  { label: 'Negative', value: 14.8, count: 3635, trend: 'down', change: '-1.2%' },
  { label: 'Neutral', value: 11.0, count: 2701, trend: 'neutral', change: '0%' },
];

const sentimentTrendData = [
  { date: 'Jan 1', positive: 68, negative: 18, neutral: 14 },
  { date: 'Jan 8', positive: 70, negative: 17, neutral: 13 },
  { date: 'Jan 15', positive: 71, negative: 16, neutral: 13 },
  { date: 'Jan 22', positive: 69, negative: 19, neutral: 12 },
  { date: 'Jan 29', positive: 72, negative: 16, neutral: 12 },
  { date: 'Feb 5', positive: 73, negative: 15, neutral: 12 },
  { date: 'Feb 12', positive: 72, negative: 17, neutral: 11 },
  { date: 'Feb 19', positive: 74, negative: 15, neutral: 11 },
  { date: 'Feb 26', positive: 75, negative: 14, neutral: 11 },
  { date: 'Mar 5', positive: 74, negative: 15, neutral: 11 },
];

const trendingIssues = [
  { issue: 'Road Infrastructure', sentiment: -12, mentions: 456, trend: 'negative' },
  { issue: 'Development Projects', sentiment: 85, mentions: 892, trend: 'positive' },
  { issue: 'Water Supply', sentiment: -8, mentions: 234, trend: 'negative' },
  { issue: 'Employment Schemes', sentiment: 78, mentions: 567, trend: 'positive' },
  { issue: 'Healthcare Services', sentiment: 62, mentions: 345, trend: 'positive' },
  { issue: 'Education Quality', sentiment: -5, mentions: 289, trend: 'negative' },
];

const keywordCloudData = [
  { word: 'development', frequency: 890 },
  { word: 'roads', frequency: 567 },
  { word: 'water', frequency: 456 },
  { word: 'employment', frequency: 678 },
  { word: 'schemes', frequency: 534 },
  { word: 'healthcare', frequency: 445 },
];

const boothSentimentData = [
  { booth: 'Booth 001', positive: 78, negative: 12, neutral: 10 },
  { booth: 'Booth 002', positive: 65, negative: 20, neutral: 15 },
  { booth: 'Booth 003', positive: 82, negative: 10, neutral: 8 },
  { booth: 'Booth 004', positive: 80, negative: 12, neutral: 8 },
  { booth: 'Booth 005', positive: 62, negative: 25, neutral: 13 },
  { booth: 'Booth 006', positive: 75, negative: 15, neutral: 10 },
];

const alerts = [
  { 
    id: 1, 
    type: 'negative', 
    message: 'Negative sentiment spike in Booth 002 - Market Area', 
    severity: 'high',
    time: '15 mins ago',
    details: 'Road construction delays causing frustration'
  },
  { 
    id: 2, 
    type: 'negative', 
    message: 'Water supply complaints increasing in East Zone', 
    severity: 'medium',
    time: '1 hour ago',
    details: '23% increase in negative mentions'
  },
  { 
    id: 3, 
    type: 'positive', 
    message: 'Positive response to new employment scheme', 
    severity: 'info',
    time: '2 hours ago',
    details: 'High engagement and approval ratings'
  },
];

export default function SentimentAnalysis() {
  const handleGenerateReport = () => {
    toast.success('Generating sentiment analysis report... Download will start shortly!');
    // In production, this would generate a PDF/Excel report with charts and analysis
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
          <p className="text-gray-600 mt-1">Real-time public opinion and sentiment tracking</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </div>

      {/* Sentiment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sentimentOverview.map((sentiment, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{sentiment.label} Sentiment</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{sentiment.value}%</h3>
                <p className="text-sm text-gray-600">{sentiment.count.toLocaleString()} mentions</p>
              </div>
              <div className={`p-3 rounded-xl ${
                sentiment.label === 'Positive' ? 'bg-green-100' :
                sentiment.label === 'Negative' ? 'bg-red-100' :
                'bg-gray-100'
              }`}>
                {sentiment.label === 'Positive' ? (
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                ) : sentiment.label === 'Negative' ? (
                  <ThumbsDown className="w-6 h-6 text-red-600" />
                ) : (
                  <Minus className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {sentiment.trend === 'up' ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">{sentiment.change}</span>
                </>
              ) : sentiment.trend === 'down' ? (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">{sentiment.change}</span>
                </>
              ) : (
                <>
                  <Minus className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{sentiment.change}</span>
                </>
              )}
              <span className="text-sm text-gray-500">vs last week</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Over Time */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Sentiment Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" name="Positive %" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Neutral %" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" name="Negative %" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Trending Issues */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Trending Issues</h3>
          <div className="space-y-3">
            {trendingIssues.map((issue, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{issue.issue}</h4>
                    {issue.trend === 'positive' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{issue.mentions} mentions</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  issue.sentiment > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {issue.sentiment > 0 ? '+' : ''}{issue.sentiment}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Keyword Cloud */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Top Keywords</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={keywordCloudData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="word" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="frequency" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Booth-wise Sentiment Heatmap */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Booth-wise Sentiment Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={boothSentimentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="booth" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive %" />
            <Bar dataKey="neutral" stackId="a" fill="#f59e0b" name="Neutral %" />
            <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative %" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Alerts Panel */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Active Alerts & Issue Detection
        </h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-orange-50 border-orange-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{alert.message}</h4>
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'default' :
                      'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.details}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Create Action Plan</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}