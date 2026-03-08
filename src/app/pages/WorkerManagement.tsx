import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, UserPlus, Award, MapPin, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { AddWorkerDialog } from '../components/AddWorkerDialog';
import { AssignTaskDialog } from '../components/AssignTaskDialog';

const workers = [
  {
    id: 1,
    name: 'Suresh Kumar',
    booth: 'Booth 001',
    tasksAssigned: 45,
    tasksCompleted: 42,
    visitsToday: 15,
    performance: 93,
    phone: '+91 98765 11111',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Ramesh Patel',
    booth: 'Booth 002',
    tasksAssigned: 38,
    tasksCompleted: 32,
    visitsToday: 12,
    performance: 84,
    phone: '+91 98765 22222',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Kavita Singh',
    booth: 'Booth 001',
    tasksAssigned: 52,
    tasksCompleted: 48,
    visitsToday: 18,
    performance: 92,
    phone: '+91 98765 33333',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Anil Sharma',
    booth: 'Booth 003',
    tasksAssigned: 40,
    tasksCompleted: 35,
    visitsToday: 10,
    performance: 88,
    phone: '+91 98765 44444',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Meena Reddy',
    booth: 'Booth 004',
    tasksAssigned: 42,
    tasksCompleted: 38,
    visitsToday: 14,
    performance: 90,
    phone: '+91 98765 55555',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Vijay Kumar',
    booth: 'Booth 002',
    tasksAssigned: 35,
    tasksCompleted: 28,
    visitsToday: 8,
    performance: 80,
    phone: '+91 98765 66666',
    status: 'Inactive'
  },
  {
    id: 7,
    name: 'Priya Desai',
    booth: 'Booth 005',
    tasksAssigned: 48,
    tasksCompleted: 45,
    visitsToday: 16,
    performance: 94,
    phone: '+91 98765 77777',
    status: 'Active'
  },
  {
    id: 8,
    name: 'Rajesh Yadav',
    booth: 'Booth 003',
    tasksAssigned: 36,
    tasksCompleted: 30,
    visitsToday: 11,
    performance: 83,
    phone: '+91 98765 88888',
    status: 'Active'
  },
];

const performanceData = [
  { week: 'Week 1', avgVisits: 45, tasksCompleted: 156 },
  { week: 'Week 2', avgVisits: 52, tasksCompleted: 178 },
  { week: 'Week 3', avgVisits: 48, tasksCompleted: 165 },
  { week: 'Week 4', avgVisits: 58, tasksCompleted: 192 },
];

const activityTimeline = [
  { time: '09:00 AM', worker: 'Suresh Kumar', action: 'Started door-to-door campaign in Ward 5' },
  { time: '09:15 AM', worker: 'Kavita Singh', action: 'Completed voter verification task' },
  { time: '09:30 AM', worker: 'Meena Reddy', action: 'Reported infrastructure issue in Booth 4 area' },
  { time: '10:00 AM', worker: 'Priya Desai', action: 'Conducted beneficiary survey - 12 households' },
  { time: '10:30 AM', worker: 'Anil Sharma', action: 'Distributed campaign material in Market Area' },
  { time: '11:00 AM', worker: 'Ramesh Patel', action: 'Organized community meeting with 25 attendees' },
];

export default function WorkerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBooth, setFilterBooth] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddWorkerDialogOpen, setIsAddWorkerDialogOpen] = useState(false);
  const [isAssignTaskDialogOpen, setIsAssignTaskDialogOpen] = useState(false);

  const handleAssignTasks = () => {
    setIsAssignTaskDialogOpen(true);
  };

  const handleAddWorker = () => {
    setIsAddWorkerDialogOpen(true);
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.phone.includes(searchQuery);
    const matchesBooth = filterBooth === 'all' || worker.booth === filterBooth;
    const matchesStatus = filterStatus === 'all' || worker.status === filterStatus;
    return matchesSearch && matchesBooth && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Worker Management</h1>
          <p className="text-gray-600 mt-1">Track and manage field worker performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAssignTasks}>Assign Tasks</Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddWorker}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Worker
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Workers</p>
            <UserPlus className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold">1,248</h3>
          <p className="text-sm text-green-600 mt-1">+8 this week</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Active Today</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold">1,186</h3>
          <p className="text-sm text-gray-600 mt-1">95% of total</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-3xl font-bold">8,456</h3>
          <p className="text-sm text-green-600 mt-1">+12% vs yesterday</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Performance</p>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-3xl font-bold">87.5%</h3>
          <p className="text-sm text-green-600 mt-1">+2.3% this month</p>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Worker Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgVisits" stroke="#3b82f6" name="Avg Visits/Worker" />
              <Line type="monotone" dataKey="tasksCompleted" stroke="#10b981" name="Tasks Completed" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Activity Timeline</h3>
          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {activityTimeline.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  {index < activityTimeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <span className="text-xs font-medium text-gray-700">{activity.worker}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Worker List */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search workers by name or phone..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-700">Worker Name</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Assigned Booth</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Tasks</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Visits Today</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Performance</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-sm">{worker.name}</p>
                      <p className="text-xs text-gray-500">{worker.phone}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{worker.booth}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <span className="font-medium text-green-600">{worker.tasksCompleted}</span>
                      <span className="text-gray-500"> / {worker.tasksAssigned}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-medium">{worker.visitsToday}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div 
                          className={`h-2 rounded-full ${
                            worker.performance >= 90 ? 'bg-green-500' :
                            worker.performance >= 80 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${worker.performance}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{worker.performance}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant={worker.status === 'Active' ? 'default' : 'secondary'}>
                      {worker.status}
                    </Badge>
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
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{worker.name}</h4>
                  <p className="text-sm text-gray-500">{worker.phone}</p>
                </div>
                <Badge variant={worker.status === 'Active' ? 'default' : 'secondary'}>
                  {worker.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booth:</span>
                  <span className="font-medium">{worker.booth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasks:</span>
                  <span className="font-medium">{worker.tasksCompleted}/{worker.tasksAssigned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visits Today:</span>
                  <span className="font-medium">{worker.visitsToday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Performance:</span>
                  <span className={`font-medium ${
                    worker.performance >= 90 ? 'text-green-600' :
                    worker.performance >= 80 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {worker.performance}%
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Add Worker Dialog */}
      <AddWorkerDialog open={isAddWorkerDialogOpen} onOpenChange={setIsAddWorkerDialogOpen} />

      {/* Assign Task Dialog */}
      <AssignTaskDialog open={isAssignTaskDialogOpen} onOpenChange={setIsAssignTaskDialogOpen} />
    </div>
  );
}