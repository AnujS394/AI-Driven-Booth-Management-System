import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { ClipboardList, Calendar } from 'lucide-react';

interface AssignTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignTaskDialog({ open, onOpenChange }: AssignTaskDialogProps) {
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskType: '',
    assignTo: [] as string[],
    priority: '',
    dueDate: '',
    booth: '',
    description: '',
    targetCount: '',
  });

  const workers = [
    'Suresh Kumar',
    'Ramesh Patel',
    'Priya Singh',
    'Amit Verma',
    'Sunita Sharma',
    'Vijay Gupta',
  ];

  const handleWorkerToggle = (worker: string) => {
    setFormData(prev => ({
      ...prev,
      assignTo: prev.assignTo.includes(worker)
        ? prev.assignTo.filter(w => w !== worker)
        : [...prev.assignTo, worker]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.assignTo.length === 0) {
      toast.error('Please select at least one worker');
      return;
    }
    toast.success(`Task assigned to ${formData.assignTo.length} worker(s) successfully!`);
    onOpenChange(false);
    // Reset form
    setFormData({
      taskTitle: '',
      taskType: '',
      assignTo: [],
      priority: '',
      dueDate: '',
      booth: '',
      description: '',
      targetCount: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            Assign New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Task Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="taskTitle">Task Title *</Label>
                <Input
                  id="taskTitle"
                  value={formData.taskTitle}
                  onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  placeholder="e.g., Door-to-door voter survey"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taskType">Task Type *</Label>
                <Select value={formData.taskType} onValueChange={(value) => setFormData({ ...formData, taskType: value })}>
                  <SelectTrigger id="taskType">
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voter-survey">Voter Survey</SelectItem>
                    <SelectItem value="door-to-door">Door-to-Door Campaign</SelectItem>
                    <SelectItem value="phone-banking">Phone Banking</SelectItem>
                    <SelectItem value="data-entry">Data Entry</SelectItem>
                    <SelectItem value="event-organization">Event Organization</SelectItem>
                    <SelectItem value="voter-registration">Voter Registration</SelectItem>
                    <SelectItem value="scheme-awareness">Scheme Awareness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High - Urgent</SelectItem>
                    <SelectItem value="medium">Medium - Normal</SelectItem>
                    <SelectItem value="low">Low - Can Wait</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="booth">Target Booth</Label>
                <Select value={formData.booth} onValueChange={(value) => setFormData({ ...formData, booth: value })}>
                  <SelectTrigger id="booth">
                    <SelectValue placeholder="Select booth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Booths</SelectItem>
                    <SelectItem value="001">Booth 001 - Gandhi Nagar</SelectItem>
                    <SelectItem value="002">Booth 002 - Nehru Park</SelectItem>
                    <SelectItem value="003">Booth 003 - Central Market</SelectItem>
                    <SelectItem value="004">Booth 004 - Railway Colony</SelectItem>
                    <SelectItem value="005">Booth 005 - Green Valley</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCount">Target Count</Label>
                <Input
                  id="targetCount"
                  type="number"
                  value={formData.targetCount}
                  onChange={(e) => setFormData({ ...formData, targetCount: e.target.value })}
                  placeholder="e.g., 100 voters"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="description">Task Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed instructions for the task..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Assign Workers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Assign Workers * 
              {formData.assignTo.length > 0 && (
                <span className="text-sm font-normal text-blue-600 ml-2">
                  ({formData.assignTo.length} selected)
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-lg bg-gray-50">
              {workers.map((worker) => (
                <div key={worker} className="flex items-center space-x-3 p-2 bg-white rounded border hover:border-blue-500 transition-colors">
                  <Checkbox
                    id={worker}
                    checked={formData.assignTo.includes(worker)}
                    onCheckedChange={() => handleWorkerToggle(worker)}
                  />
                  <label
                    htmlFor={worker}
                    className="text-sm cursor-pointer flex-1"
                  >
                    <div className="font-medium">{worker}</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setFormData({ ...formData, assignTo: workers })}
            >
              Select All
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setFormData({ ...formData, assignTo: [] })}
            >
              Clear Selection
            </Button>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <ClipboardList className="w-4 h-4 mr-2" />
              Assign Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
