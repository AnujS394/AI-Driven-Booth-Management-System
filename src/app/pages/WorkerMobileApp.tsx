import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Home, 
  ClipboardList, 
  MessageCircle, 
  User, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Camera,
  ArrowLeft,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';

type Screen = 'dashboard' | 'tasks' | 'report' | 'feedback';

const tasks = [
  { id: 1, title: 'Door-to-door visit - Ward 5', status: 'pending', priority: 'high', location: 'Ward 5, Sector A', dueDate: '2026-03-06' },
  { id: 2, title: 'Voter verification - 15 households', status: 'pending', priority: 'medium', location: 'Market Area', dueDate: '2026-03-06' },
  { id: 3, title: 'Distribute campaign material', status: 'completed', priority: 'low', location: 'Station Road', dueDate: '2026-03-05' },
  { id: 4, title: 'Beneficiary survey', status: 'pending', priority: 'high', location: 'Gandhi Nagar', dueDate: '2026-03-07' },
  { id: 5, title: 'Community meeting attendance', status: 'completed', priority: 'medium', location: 'Community Center', dueDate: '2026-03-04' },
  { id: 6, title: 'Voter registration drive', status: 'pending', priority: 'high', location: 'College Area', dueDate: '2026-03-08' },
];

const recentActivities = [
  { id: 1, action: 'Completed door-to-door visit', location: 'Ward 5', time: '2 hours ago' },
  { id: 2, action: 'Submitted beneficiary survey', location: 'Gandhi Nagar', time: '5 hours ago' },
  { id: 3, action: 'Reported citizen feedback', location: 'Market Area', time: '1 day ago' },
  { id: 4, action: 'Attended community meeting', location: 'Community Center', time: '2 days ago' },
];

export default function WorkerMobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'My Tasks', icon: ClipboardList },
    { id: 'report', label: 'Report Visit', icon: Camera },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
  ];

  const renderDashboard = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Welcome, Suresh Kumar</h2>
              <p className="text-blue-100 text-sm">Worker ID: WRK-001</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Booth 001 - Gandhi Nagar</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/20">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-gray-600">Tasks Assigned</p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">{totalTasks}</h3>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </Card>
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-green-600">{completedTasks}</h3>
          <p className="text-xs text-gray-500 mt-1">{progress.toFixed(0)}% done</p>
        </Card>
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <p className="text-sm text-gray-600">Visits Today</p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">15</h3>
          <p className="text-xs text-green-600 mt-1">+3 vs yesterday</p>
        </Card>
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-500" />
            <p className="text-sm text-gray-600">Performance</p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600">93%</h3>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </Card>
      </div>

      {/* Desktop: Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Daily Progress */}
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold text-lg mb-4">Daily Target Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">House Visits</span>
                <span className="font-medium">15 / 20</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-medium">{completedTasks} / {totalTasks}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Weekly Goal</span>
                <span className="font-medium">82 / 100</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Recent Activity - Desktop Only */}
        <Card className="p-4 md:p-6 hidden md:block">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.location}</span>
                    <span className="text-xs text-gray-400">• {activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's Tasks */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Today's Priority Tasks</h3>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setCurrentScreen('tasks')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tasks.filter(t => t.status === 'pending').slice(0, 4).map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{task.location}</span>
                  </div>
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button 
          className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => setCurrentScreen('report')}
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm">Report Visit</span>
        </Button>
        <Button 
          className="h-20 flex flex-col gap-2"
          variant="outline"
          onClick={() => setCurrentScreen('feedback')}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm">Submit Feedback</span>
        </Button>
        <Button 
          className="h-20 flex flex-col gap-2 hidden md:flex"
          variant="outline"
          onClick={() => setCurrentScreen('tasks')}
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-sm">View Tasks</span>
        </Button>
        <Button 
          className="h-20 flex flex-col gap-2 hidden md:flex"
          variant="outline"
        >
          <MapPin className="w-6 h-6" />
          <span className="text-sm">My Location</span>
        </Button>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => setCurrentScreen('dashboard')}
          className="md:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold">My Tasks</h2>
          <p className="text-sm text-gray-600">{tasks.filter(t => t.status === 'pending').length} pending tasks</p>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>

      {/* Desktop: Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                task.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {task.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-semibold text-sm">{task.title}</h3>
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' :
                    task.priority === 'medium' ? 'default' :
                    'secondary'
                  }>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{task.location}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
                {task.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Mark Complete</Button>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                )}
                {task.status === 'completed' && (
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReport = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => setCurrentScreen('dashboard')}
          className="md:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Report Visit</h2>
          <p className="text-sm text-gray-600">Door-to-door visit report</p>
        </div>
      </div>

      {/* Desktop: Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold mb-4">Visitor Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="voter-name">Voter Name *</Label>
              <Input id="voter-name" placeholder="Enter voter name" />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" />
            </div>

            <div>
              <Label htmlFor="location">Location/Address *</Label>
              <Input id="location" placeholder="Enter location" />
            </div>

            <div>
              <Label htmlFor="voter-id">Voter ID (Optional)</Label>
              <Input id="voter-id" placeholder="Enter voter ID" />
            </div>

            <div>
              <Label htmlFor="family-size">Family Size</Label>
              <Input id="family-size" type="number" placeholder="Number of family members" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold mb-4">Visit Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="issues">Issues Reported</Label>
              <Textarea 
                id="issues" 
                placeholder="Describe any issues or concerns..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="sentiment">Voter Sentiment</Label>
              <select id="sentiment" className="w-full p-2 border rounded-lg">
                <option>Select sentiment</option>
                <option>Very Positive</option>
                <option>Positive</option>
                <option>Neutral</option>
                <option>Negative</option>
                <option>Very Negative</option>
              </select>
            </div>

            <div>
              <Label>Upload Photos (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Take or upload photos</p>
                <Button size="sm" variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Open Camera
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 md:col-span-2">
          <div className="flex flex-col md:flex-row gap-3 justify-end">
            <Button variant="outline" onClick={() => setCurrentScreen('dashboard')} className="md:w-auto">
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 md:w-auto">
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => setCurrentScreen('dashboard')}
          className="md:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Citizen Feedback</h2>
          <p className="text-sm text-gray-600">Submit complaints or surveys</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold mb-4">Feedback Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback-type">Feedback Type *</Label>
              <select 
                id="feedback-type" 
                className="w-full p-2 border rounded-lg"
              >
                <option>Select type</option>
                <option>Complaint</option>
                <option>Suggestion</option>
                <option>Survey Response</option>
                <option>Request</option>
                <option>Appreciation</option>
              </select>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <select 
                id="category" 
                className="w-full p-2 border rounded-lg"
              >
                <option>Select category</option>
                <option>Road & Infrastructure</option>
                <option>Water Supply</option>
                <option>Electricity</option>
                <option>Sanitation</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Employment</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="priority">Priority Level *</Label>
              <select 
                id="priority" 
                className="w-full p-2 border rounded-lg"
              >
                <option>Normal</option>
                <option>Urgent</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold mb-4">Citizen Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="citizen-name">Citizen Name *</Label>
              <Input id="citizen-name" placeholder="Enter citizen name" />
            </div>

            <div>
              <Label htmlFor="citizen-phone">Contact Number *</Label>
              <Input id="citizen-phone" type="tel" placeholder="Enter phone number" />
            </div>

            <div>
              <Label htmlFor="citizen-location">Location</Label>
              <Input id="citizen-location" placeholder="Enter location" />
            </div>

            <div>
              <Label htmlFor="ward">Ward/Booth</Label>
              <Input id="ward" placeholder="Ward/Booth number" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 md:col-span-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="details">Detailed Description *</Label>
              <Textarea 
                id="details" 
                placeholder="Describe the issue or feedback in detail..."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="expected-action">Expected Action/Solution</Label>
              <Textarea 
                id="expected-action" 
                placeholder="What resolution or action is expected?"
                rows={3}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setCurrentScreen('dashboard')} className="md:w-auto">
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 md:w-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop: Sidebar Navigation */}
      <div className="hidden md:flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-blue-600">Worker Portal</h1>
            <p className="text-sm text-gray-600">Field Operations</p>
          </div>
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id as Screen)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      currentScreen === item.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Suresh Kumar</p>
                <p className="text-xs text-gray-500">WRK-001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {currentScreen === 'dashboard' && renderDashboard()}
            {currentScreen === 'tasks' && renderTasks()}
            {currentScreen === 'report' && renderReport()}
            {currentScreen === 'feedback' && renderFeedback()}
          </div>
        </div>
      </div>

      {/* Mobile: Full Screen with Bottom Nav */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="font-bold text-lg">Worker Portal</h1>
              <p className="text-xs text-gray-600">Field Operations</p>
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 pb-24">
          {currentScreen === 'dashboard' && renderDashboard()}
          {currentScreen === 'tasks' && renderTasks()}
          {currentScreen === 'report' && renderReport()}
          {currentScreen === 'feedback' && renderFeedback()}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                    currentScreen === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}