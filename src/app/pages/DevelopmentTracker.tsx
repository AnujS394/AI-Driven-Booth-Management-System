import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Construction, MapPin, CheckCircle, Clock, AlertCircle, Plus, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { AddProjectDialog } from '../components/AddProjectDialog';

const projects = [
  {
    id: 1,
    title: 'Main Road Construction - Ward 5',
    type: 'Road',
    status: 'Completed',
    startDate: '2025-12-01',
    completionDate: '2026-02-28',
    location: 'Ward 5, Gandhi Nagar',
    budget: '₹25,00,000',
    beneficiaries: 2400,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    images: { before: true, after: true }
  },
  {
    id: 2,
    title: 'Street Light Installation - Market Area',
    type: 'Streetlight',
    status: 'In Progress',
    startDate: '2026-01-15',
    completionDate: '2026-03-30',
    location: 'Market Area, Central Zone',
    budget: '₹8,50,000',
    beneficiaries: 1800,
    coordinates: { lat: 28.6141, lng: 77.2092 },
    images: { before: true, after: false }
  },
  {
    id: 3,
    title: 'Water Pipeline Upgrade - East Zone',
    type: 'Water',
    status: 'In Progress',
    startDate: '2026-02-01',
    completionDate: '2026-05-15',
    location: 'East Zone, Sectors 1-5',
    budget: '₹45,00,000',
    beneficiaries: 5600,
    coordinates: { lat: 28.6143, lng: 77.2094 },
    images: { before: true, after: false }
  },
  {
    id: 4,
    title: 'Drainage System - South Colony',
    type: 'Drainage',
    status: 'In Progress',
    startDate: '2026-01-20',
    completionDate: '2026-04-10',
    location: 'South Colony, Ward 8',
    budget: '₹18,00,000',
    beneficiaries: 3200,
    coordinates: { lat: 28.6138, lng: 77.2088 },
    images: { before: true, after: false }
  },
  {
    id: 5,
    title: 'Community Park Development',
    type: 'Park',
    status: 'Pending',
    startDate: '2026-03-15',
    completionDate: '2026-07-30',
    location: 'North Zone, Sector 12',
    budget: '₹12,00,000',
    beneficiaries: 4500,
    coordinates: { lat: 28.6145, lng: 77.2096 },
    images: { before: false, after: false }
  },
  {
    id: 6,
    title: 'Road Widening - Station Road',
    type: 'Road',
    status: 'Completed',
    startDate: '2025-11-01',
    completionDate: '2026-01-31',
    location: 'Station Road, Central',
    budget: '₹32,00,000',
    beneficiaries: 6800,
    coordinates: { lat: 28.6140, lng: 77.2091 },
    images: { before: true, after: true }
  },
];

const statusColors = {
  'Completed': 'bg-green-500',
  'In Progress': 'bg-blue-500',
  'Pending': 'bg-gray-400',
};

const statusBadgeVariant = {
  'Completed': 'default',
  'In Progress': 'default',
  'Pending': 'secondary',
};

const typeIcons = {
  'Road': Construction,
  'Streetlight': Construction,
  'Water': Construction,
  'Drainage': Construction,
  'Park': Construction,
};

const notifications = [
  { id: 1, message: 'Road construction completed in Ward 5', recipients: 2400, sent: '2 hours ago' },
  { id: 2, message: 'Street light installation 50% complete', recipients: 1800, sent: '5 hours ago' },
  { id: 3, message: 'Water pipeline work started in your area', recipients: 5600, sent: '1 day ago' },
  { id: 4, message: 'Drainage system work update - 30% complete', recipients: 3200, sent: '2 days ago' },
];

export default function DevelopmentTracker() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  const handleMapView = () => {
    navigate('/dashboard/map-view');
  };

  const handleAddProject = () => {
    setIsAddProjectDialogOpen(true);
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesType = filterType === 'all' || project.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Development Work Tracker</h1>
          <p className="text-gray-600 mt-1">Monitor infrastructure and development projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMapView}>
            <MapPin className="w-4 h-4 mr-2" />
            Map View
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Projects</p>
            <Construction className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold">126</h3>
          <p className="text-sm text-gray-600 mt-1">Across all zones</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Completed</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold">68</h3>
          <p className="text-sm text-green-600 mt-1">54% completion rate</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">In Progress</p>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold">42</h3>
          <p className="text-sm text-blue-600 mt-1">On schedule</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Beneficiaries</p>
            <AlertCircle className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-3xl font-bold">89.4K</h3>
          <p className="text-sm text-gray-600 mt-1">Citizens impacted</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <Card className="lg:col-span-1 p-4">
          <div className="flex gap-2 mb-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Road">Road</SelectItem>
                <SelectItem value="Streetlight">Streetlight</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
                <SelectItem value="Drainage">Drainage</SelectItem>
                <SelectItem value="Park">Park</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedProject.id === project.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[project.status]}`} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{project.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{project.type}</Badge>
                      <Badge variant={statusBadgeVariant[project.status]} className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{selectedProject.type}</Badge>
                  <Badge variant={statusBadgeVariant[selectedProject.status]}>
                    {selectedProject.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedProject.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Budget</p>
                <p className="font-semibold">{selectedProject.budget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                <p className="font-semibold">
                  {new Date(selectedProject.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Completion</p>
                <p className="font-semibold">
                  {new Date(selectedProject.completionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Beneficiaries</p>
                <p className="font-semibold">{selectedProject.beneficiaries.toLocaleString()}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">
                  {selectedProject.status === 'Completed' ? '100%' :
                   selectedProject.status === 'In Progress' ? '65%' : '0%'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${statusColors[selectedProject.status]}`}
                  style={{ 
                    width: selectedProject.status === 'Completed' ? '100%' :
                           selectedProject.status === 'In Progress' ? '65%' : '0%'
                  }}
                />
              </div>
            </div>

            {/* Before/After Images */}
            {(selectedProject.images.before || selectedProject.images.after) && (
              <div>
                <h3 className="font-semibold mb-4">Project Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.images.before && (
                    <div>
                      <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-2">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-center">Before</p>
                    </div>
                  )}
                  {selectedProject.images.after && (
                    <div>
                      <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-2">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-center">After</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Notifications Panel */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Notifications Sent to Residents</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{notification.recipients.toLocaleString()} recipients</span>
                      <span>•</span>
                      <span>{notification.sent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Send Update Notification
            </Button>
          </Card>
        </div>
      </div>

      {/* Add Project Dialog */}
      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
      />
    </div>
  );
}