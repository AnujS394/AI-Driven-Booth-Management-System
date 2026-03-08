import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { toast } from 'sonner';
import { Filter, X, RotateCcw } from 'lucide-react';

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters?: (filters: FilterState) => void;
  context?: 'voters' | 'workers' | 'booths' | 'projects' | 'general';
}

export interface FilterState {
  // Common Filters
  dateRange?: { start: string; end: string };
  status?: string[];
  
  // Voter Filters
  ageRange?: [number, number];
  gender?: string[];
  booth?: string[];
  segment?: string[];
  schemes?: string[];
  
  // Worker Filters
  role?: string[];
  performance?: string;
  availability?: string;
  
  // Booth Filters
  area?: string[];
  voterCount?: [number, number];
  
  // Project Filters
  projectType?: string[];
  completion?: [number, number];
  budget?: [number, number];
}

export function FiltersDialog({ open, onOpenChange, onApplyFilters, context = 'general' }: FiltersDialogProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    gender: [],
    booth: [],
    segment: [],
    schemes: [],
    role: [],
    area: [],
    projectType: [],
    ageRange: [18, 80],
    voterCount: [0, 5000],
    completion: [0, 100],
    budget: [0, 10000000],
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const statusOptions = ['Active', 'Inactive', 'Pending', 'Completed', 'In Progress'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const boothOptions = ['Booth 001', 'Booth 002', 'Booth 003', 'Booth 004', 'Booth 005'];
  const segmentOptions = ['Youth (18-35)', 'Business', 'Farmer', 'Women', 'Senior Citizen', 'Professional'];
  const schemeOptions = ['PM-MUDRA', 'PM-KISAN', 'PM-Awas', 'LPG Subsidy', 'GST Benefit'];
  const roleOptions = ['Field Coordinator', 'Booth Manager', 'Voter Outreach', 'Data Collector', 'Volunteer'];
  const areaOptions = ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'];
  const projectTypeOptions = ['Road Construction', 'Water Supply', 'Electricity', 'Sanitation', 'Education'];

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = (prev[key] as string[]) || [];
      return {
        ...prev,
        [key]: currentArray.includes(value)
          ? currentArray.filter(v => v !== value)
          : [...currentArray, value]
      };
    });
  };

  const handleReset = () => {
    setFilters({
      status: [],
      gender: [],
      booth: [],
      segment: [],
      schemes: [],
      role: [],
      area: [],
      projectType: [],
      ageRange: [18, 80],
      voterCount: [0, 5000],
      completion: [0, 100],
      budget: [0, 10000000],
    });
    setStartDate('');
    setEndDate('');
    toast.info('All filters reset');
  };

  const handleApply = () => {
    const finalFilters = {
      ...filters,
      ...(startDate && endDate ? { dateRange: { start: startDate, end: endDate } } : {})
    };
    
    if (onApplyFilters) {
      onApplyFilters(finalFilters);
    }
    
    const activeFilterCount = Object.values(finalFilters).filter(v => 
      Array.isArray(v) ? v.length > 0 : v !== undefined
    ).length;
    
    toast.success(`${activeFilterCount} filter(s) applied successfully!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Advanced Filters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Range Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {statusOptions.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.status?.includes(status)}
                    onCheckedChange={() => toggleArrayFilter('status', status)}
                  />
                  <label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Voter-Specific Filters */}
          {(context === 'voters' || context === 'general') && (
            <>
              {/* Age Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Age Range: {filters.ageRange?.[0]} - {filters.ageRange?.[1]} years
                </h3>
                <Slider
                  min={18}
                  max={100}
                  step={1}
                  value={filters.ageRange}
                  onValueChange={(value) => setFilters({ ...filters, ageRange: value as [number, number] })}
                  className="w-full"
                />
              </div>

              {/* Gender */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Gender</h3>
                <div className="grid grid-cols-3 gap-3">
                  {genderOptions.map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <Checkbox
                        id={`gender-${gender}`}
                        checked={filters.gender?.includes(gender)}
                        onCheckedChange={() => toggleArrayFilter('gender', gender)}
                      />
                      <label htmlFor={`gender-${gender}`} className="text-sm cursor-pointer">
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booth */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Booth</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {boothOptions.map((booth) => (
                    <div key={booth} className="flex items-center space-x-2">
                      <Checkbox
                        id={`booth-${booth}`}
                        checked={filters.booth?.includes(booth)}
                        onCheckedChange={() => toggleArrayFilter('booth', booth)}
                      />
                      <label htmlFor={`booth-${booth}`} className="text-sm cursor-pointer">
                        {booth}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voter Segment */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Voter Segment</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {segmentOptions.map((segment) => (
                    <div key={segment} className="flex items-center space-x-2">
                      <Checkbox
                        id={`segment-${segment}`}
                        checked={filters.segment?.includes(segment)}
                        onCheckedChange={() => toggleArrayFilter('segment', segment)}
                      />
                      <label htmlFor={`segment-${segment}`} className="text-sm cursor-pointer">
                        {segment}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Government Schemes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Government Schemes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {schemeOptions.map((scheme) => (
                    <div key={scheme} className="flex items-center space-x-2">
                      <Checkbox
                        id={`scheme-${scheme}`}
                        checked={filters.schemes?.includes(scheme)}
                        onCheckedChange={() => toggleArrayFilter('schemes', scheme)}
                      />
                      <label htmlFor={`scheme-${scheme}`} className="text-sm cursor-pointer">
                        {scheme}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Worker-Specific Filters */}
          {(context === 'workers' || context === 'general') && (
            <>
              {/* Role */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Worker Role</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {roleOptions.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={filters.role?.includes(role)}
                        onCheckedChange={() => toggleArrayFilter('role', role)}
                      />
                      <label htmlFor={`role-${role}`} className="text-sm cursor-pointer">
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Rating</h3>
                <Select value={filters.performance} onValueChange={(value) => setFilters({ ...filters, performance: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select performance rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="excellent">Excellent (4.5+)</SelectItem>
                    <SelectItem value="good">Good (3.5 - 4.5)</SelectItem>
                    <SelectItem value="average">Average (2.5 - 3.5)</SelectItem>
                    <SelectItem value="below">Below Average (&lt; 2.5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Booth-Specific Filters */}
          {(context === 'booths' || context === 'general') && (
            <>
              {/* Area */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Area/Zone</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {areaOptions.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={`area-${area}`}
                        checked={filters.area?.includes(area)}
                        onCheckedChange={() => toggleArrayFilter('area', area)}
                      />
                      <label htmlFor={`area-${area}`} className="text-sm cursor-pointer">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voter Count Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Voter Count: {filters.voterCount?.[0].toLocaleString()} - {filters.voterCount?.[1].toLocaleString()}
                </h3>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.voterCount}
                  onValueChange={(value) => setFilters({ ...filters, voterCount: value as [number, number] })}
                  className="w-full"
                />
              </div>
            </>
          )}

          {/* Project-Specific Filters */}
          {(context === 'projects' || context === 'general') && (
            <>
              {/* Project Type */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {projectTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.projectType?.includes(type)}
                        onCheckedChange={() => toggleArrayFilter('projectType', type)}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Percentage */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Completion: {filters.completion?.[0]}% - {filters.completion?.[1]}%
                </h3>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={filters.completion}
                  onValueChange={(value) => setFilters({ ...filters, completion: value as [number, number] })}
                  className="w-full"
                />
              </div>

              {/* Budget Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Budget: ₹{(filters.budget?.[0] / 100000).toFixed(1)}L - ₹{(filters.budget?.[1] / 100000).toFixed(1)}L
                </h3>
                <Slider
                  min={0}
                  max={50000000}
                  step={100000}
                  value={filters.budget}
                  onValueChange={(value) => setFilters({ ...filters, budget: value as [number, number] })}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
