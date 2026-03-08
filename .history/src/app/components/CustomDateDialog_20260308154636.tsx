import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Calendar, Filter } from 'lucide-react';

interface CustomDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (startDate: string, endDate: string) => void;
}

export function CustomDateDialog({ open, onOpenChange, onApply }: CustomDateDialogProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quickSelect, setQuickSelect] = useState('');

  const handleQuickSelect = (value: string) => {
    setQuickSelect(value);
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (value) {
      case 'today':
        start = today;
        end = today;
        break;
      case 'yesterday':
        start = new Date(today.setDate(today.getDate() - 1));
        end = start;
        break;
      case 'last-7-days':
        start = new Date(today.setDate(today.getDate() - 7));
        end = new Date();
        break;
      case 'last-30-days':
        start = new Date(today.setDate(today.getDate() - 30));
        end = new Date();
        break;
      case 'this-month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date();
        break;
      case 'last-month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'this-quarter':
        const quarter = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), quarter * 3, 1);
        end = new Date();
        break;
      case 'this-year':
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date();
        break;
      default:
        return;
    }

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleApply = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date must be before end date');
      return;
    }

    toast.success(`Date range applied: ${startDate} to ${endDate}`);
    if (onApply) {
      onApply(startDate, endDate);
    }
    onOpenChange(false);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setQuickSelect('');
    toast.info('Date range reset');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Custom Date Range
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Select */}
          <div className="space-y-2">
            <Label htmlFor="quickSelect">Quick Select</Label>
            <Select value={quickSelect} onValueChange={handleQuickSelect}>
              <SelectTrigger id="quickSelect">
                <SelectValue placeholder="Choose a preset range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or select custom dates</span>
            </div>
          </div>

          {/* Custom Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setQuickSelect('');
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setQuickSelect('');
                }}
              />
            </div>
          </div>

          {/* Date Range Summary */}
          {startDate && endDate && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Selected Range</p>
              </div>
              <p className="text-sm text-blue-700">
                {new Date(startDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
                {' '} - {' '}
                {new Date(endDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
