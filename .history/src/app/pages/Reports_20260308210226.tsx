import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  FileJson
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { downloadCSV, downloadJSON, downloadText } from '../utils/exportUtils';
import { CustomDateDialog } from '../components/CustomDateDialog';

const initialReports = [
  { id: 1, name: 'Monthly Voter Analysis', type: 'Analytics', date: '2026-03-01', status: 'Ready', size: '2.4 MB' },
  { id: 2, name: 'Booth Performance Report', type: 'Performance', date: '2026-03-03', status: 'Ready', size: '1.8 MB' },
  { id: 3, name: 'Worker Activity Summary', type: 'Operations', date: '2026-03-05', status: 'Ready', size: '956 KB' },
  { id: 4, name: 'Sentiment Trends Report', type: 'Analytics', date: '2026-03-06', status: 'Processing', size: '3.2 MB' },
  { id: 5, name: 'Development Projects Overview', type: 'Projects', date: '2026-03-07', status: 'Ready', size: '1.5 MB' },
  { id: 6, name: 'Campaign Performance Report', type: 'Campaigns', date: '2026-03-07', status: 'Ready', size: '2.1 MB' },
];

const voterTurnoutData = [
  { booth: 'Booth 001', turnout: 78, registered: 2450 },
  { booth: 'Booth 002', turnout: 82, registered: 2890 },
  { booth: 'Booth 003', turnout: 75, registered: 2156 },
  { booth: 'Booth 004', turnout: 88, registered: 3245 },
  { booth: 'Booth 005', turnout: 71, registered: 1987 },
  { booth: 'Booth 006', turnout: 85, registered: 2678 },
];

const sentimentData = [
  { id: 1, name: 'Very Positive', value: 3245, color: '#10b981' },
  { id: 2, name: 'Positive', value: 5678, color: '#34d399' },
  { id: 3, name: 'Neutral', value: 4321, color: '#fbbf24' },
  { id: 4, name: 'Negative', value: 2156, color: '#f87171' },
  { id: 5, name: 'Very Negative', value: 987, color: '#dc2626' },
];

const workerPerformanceData = [
  { month: 'Sep', tasks: 156, visits: 1240 },
  { month: 'Oct', tasks: 189, visits: 1456 },
  { month: 'Nov', tasks: 234, visits: 1789 },
  { month: 'Dec', tasks: 198, visits: 1567 },
  { month: 'Jan', tasks: 267, visits: 2045 },
  { month: 'Feb', tasks: 312, visits: 2345 },
  { month: 'Mar', tasks: 345, visits: 2678 },
];

const campaignMetrics = [
  { week: 'Week 1', reach: 45000, engagement: 34500, conversion: 12300 },
  { week: 'Week 2', reach: 52000, engagement: 41200, conversion: 15600 },
  { week: 'Week 3', reach: 48000, engagement: 38900, conversion: 14200 },
  { week: 'Week 4', reach: 61000, engagement: 49800, conversion: 18900 },
];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [isCustomDateDialogOpen, setCustomDateDialogOpen] = useState(false);
  
  // Custom report creation state
  const [customReportType, setCustomReportType] = useState('');
  const [customTimePeriod, setCustomTimePeriod] = useState('');

  const handleCustomDate = () => {
    setCustomDateDialogOpen(true);
  };

  const handleExportAll = () => {
    toast.success('Exporting all reports... Download will start shortly!');
    // Simulate download
    setTimeout(() => {
      toast.success('All reports exported successfully as ZIP file');
    }, 1500);
  };

  const handleDownloadReport = (report: any) => {
    if (report.status !== 'Ready') {
      toast.error('Report is still processing. Please wait.');
      return;
    }
    
    toast.success(`Downloading "${report.name}"...`);
    // Simulate download
    setTimeout(() => {
      toast.success(`${report.name} downloaded successfully!`);
    }, 1000);
  };

  const handleViewReport = (report: any) => {
    if (report.status !== 'Ready') {
      toast.error('Report is still processing. Please wait.');
      return;
    }
    
    toast.info(`Opening "${report.name}" in viewer...`);
  };

  const handleGenerateReport = () => {
    if (!customReportType) {
      toast.error('Please select a report type');
      return;
    }
    if (!customTimePeriod) {
      toast.error('Please select a time period');
      return;
    }

    const reportTypeNames: Record<string, string> = {
      voter: 'Voter Analysis',
      booth: 'Booth Performance',
      worker: 'Worker Activity',
      sentiment: 'Sentiment Trends',
      campaign: 'Campaign Metrics',
    };

    const newReport = {
      id: reports.length + 1,
      name: `Custom ${reportTypeNames[customReportType]} Report`,
      type: 'Custom',
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      size: '0 KB',
    };

    setReports([newReport, ...reports]);
    toast.success('Report generation started!');
    
    // Simulate processing
    setTimeout(() => {
      const readyReport = { ...newReport, status: 'Ready', size: '2.1 MB' };
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? readyReport
          : r
      ));
      toast.success('Report generated successfully!');
      // automatically download the generated report as JSON
      downloadJSON(`report-${newReport.id}.json`, readyReport);
    }, 3000);

    // Reset form
    setCustomReportType('');
    setCustomTimePeriod('');
  };

  const handleExportCSV = () => {
    if (reports.length === 0) {
      toast.error('No reports available to export');
      return;
    }
    downloadCSV('reports.csv', reports);
    toast.success('CSV export started');
  };

  const handleExportJSON = () => {
    if (reports.length === 0) {
      toast.error('No reports available to export');
      return;
    }
    downloadJSON('reports.json', reports);
    toast.success('JSON export started');
  };

  const handleExportPDF = () => {
    // For now we simply convert to text since PDF generation requires external library/demo data
    if (reports.length === 0) {
      toast.error('No reports available to export');
      return;
    }
    const text = reports
      .map(r => `Name: ${r.name}\nType: ${r.type}\nDate: ${r.date}\nStatus: ${r.status}\nSize: ${r.size}\n`)
      .join('\n');
    downloadText('reports.txt', text);
    toast.success('Report file downloaded (text)');
  };

  const filteredReports = reportType === 'all' 
    ? reports 
    : reports.filter(r => r.type.toLowerCase() === reportType.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and data reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCustomDate}>
            <Calendar className="w-4 h-4 mr-2" />
            Custom Date
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleExportAll}>
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Reports</p>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold">487</h3>
          <p className="text-sm text-gray-600 mt-1">Generated this year</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Active Reports</p>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold">24</h3>
          <p className="text-sm text-green-600 mt-1">Updated today</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Data Accuracy</p>
            <CheckCircle className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-3xl font-bold">99.2%</h3>
          <p className="text-sm text-gray-600 mt-1">Validation rate</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Scheduled</p>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-sm text-gray-600 mt-1">Auto-generated</p>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="voters">Voter Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Voter Turnout Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Booth-wise Voter Turnout
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleExportPDF}>
                    <FileText className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={voterTurnoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="booth" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="turnout" fill="#3b82f6" name="Turnout %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Sentiment Distribution */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-green-600" />
                  Sentiment Distribution
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleExportPDF}>
                    <FileText className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Worker Performance Trend */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Worker Performance Trend
              </h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleExportCSV}>
                  <FileSpreadsheet className="w-4 h-4 mr-1" />
                  CSV
                </Button>
                <Button size="sm" variant="outline" onClick={handleExportJSON}>
                  <FileJson className="w-4 h-4 mr-1" />
                  JSON
                </Button>
                <Button size="sm" variant="outline" onClick={handleExportPDF}>
                  <FileText className="w-4 h-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workerPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tasks" stroke="#8b5cf6" name="Tasks Completed" />
                <Line type="monotone" dataKey="visits" stroke="#10b981" name="Field Visits" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Voter Analytics Tab */}
        <TabsContent value="voters" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <Users className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-2xl font-bold">245,680</h3>
              <p className="text-sm text-gray-600">Total Registered Voters</p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+2,345 this month</span>
              </div>
            </Card>
            <Card className="p-6">
              <MapPin className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-sm text-gray-600">Active Booths</p>
              <div className="mt-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">100% operational</span>
              </div>
            </Card>
            <Card className="p-6">
              <Activity className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-2xl font-bold">82.4%</h3>
              <p className="text-sm text-gray-600">Avg Engagement Rate</p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+5.2% vs last month</span>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Voter Segmentation Analysis</h3>
              <Button onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={voterTurnoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="booth" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registered" fill="#3b82f6" name="Registered Voters" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly Performance Metrics</h3>
              <Button onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={workerPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tasks" stroke="#8b5cf6" name="Tasks" strokeWidth={2} />
                <Line type="monotone" dataKey="visits" stroke="#10b981" name="Visits" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Campaign Performance Overview</h3>
              <Button onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={campaignMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reach" stroke="#3b82f6" name="Reach" />
                <Line type="monotone" dataKey="engagement" stroke="#10b981" name="Engagement" />
                <Line type="monotone" dataKey="conversion" stroke="#f59e0b" name="Conversion" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Custom Reports Tab */}
        <TabsContent value="custom" className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h3 className="font-semibold">Generated Reports</h3>
              <div className="flex gap-2">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="campaigns">Campaigns</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{report.type}</span>
                        <span className="text-xs text-gray-500">• {report.date}</span>
                        <span className="text-xs text-gray-500">• {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'Ready' ? (
                      <Badge className="bg-green-500">Ready</Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        Processing
                      </Badge>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      disabled={report.status !== 'Ready'}
                      onClick={() => handleViewReport(report)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      disabled={report.status !== 'Ready'}
                      onClick={() => handleDownloadReport(report)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Create Custom Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Report Type *</label>
                <Select value={customReportType} onValueChange={setCustomReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voter">Voter Analysis</SelectItem>
                    <SelectItem value="booth">Booth Performance</SelectItem>
                    <SelectItem value="worker">Worker Activity</SelectItem>
                    <SelectItem value="sentiment">Sentiment Trends</SelectItem>
                    <SelectItem value="campaign">Campaign Metrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Time Period *</label>
                <Select value={customTimePeriod} onValueChange={setCustomTimePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={handleGenerateReport}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Custom Date Dialog */}
      <CustomDateDialog open={isCustomDateDialogOpen} onOpenChange={setCustomDateDialogOpen} />
    </div>
  );
}
