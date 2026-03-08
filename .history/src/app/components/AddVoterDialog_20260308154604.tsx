import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { UserPlus, Upload, X, FileText, CheckCircle } from 'lucide-react';

interface AddVoterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVoterAdded?: (voter: any) => void;
}

export function AddVoterDialog({ open, onOpenChange, onVoterAdded }: AddVoterDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    voterId: '',
    booth: '',
    occupation: '',
    segment: '',
    schemes: [] as string[],
    notes: '',
  });

  const schemes = [
    'PM-MUDRA',
    'PM-KISAN',
    'PM-Awas',
    'LPG Subsidy',
    'GST Benefit',
    'Crop Insurance',
    'Health Insurance',
    'Education Scheme',
  ];

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate files
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid file type. Use PDF, JPG, or PNG`);
        return false;
      }
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) uploaded successfully!`);
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info('File removed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (!formData.age || parseInt(formData.age) < 18) {
      toast.error('Age must be 18 or above');
      return;
    }
    if (!formData.gender) {
      toast.error('Please select gender');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!formData.voterId.trim()) {
      toast.error('Voter ID is required');
      return;
    }
    if (!formData.booth) {
      toast.error('Please select a booth');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return;
    }

    // Create voter object
    const newVoter = {
      id: `V${Date.now()}`,
      ...formData,
      documents: uploadedFiles.map(f => f.name),
      status: 'Active',
      sentiment: 'Positive',
      lastContact: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
    };

    // Call parent callback if provided
    if (onVoterAdded) {
      onVoterAdded(newVoter);
    }

    toast.success('Voter added successfully!');
    onOpenChange(false);
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      voterId: '',
      booth: '',
      occupation: '',
      segment: '',
      schemes: [],
      notes: '',
    });
    setUploadedFiles([]);
  };

  const handleSchemeToggle = (scheme: string) => {
    setFormData(prev => ({
      ...prev,
      schemes: prev.schemes.includes(scheme)
        ? prev.schemes.filter(s => s !== scheme)
        : [...prev.schemes, scheme]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Add New Voter
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter age"
                  min="18"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voterId">Voter ID Number *</Label>
                <Input
                  id="voterId"
                  value={formData.voterId}
                  onChange={(e) => setFormData({ ...formData, voterId: e.target.value })}
                  placeholder="ABC1234567"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter complete address"
                rows={2}
              />
            </div>
          </div>

          {/* Voting Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Voting Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booth">Assigned Booth *</Label>
                <Select value={formData.booth} onValueChange={(value) => setFormData({ ...formData, booth: value })}>
                  <SelectTrigger id="booth">
                    <SelectValue placeholder="Select booth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">Booth 001 - Gandhi Nagar</SelectItem>
                    <SelectItem value="002">Booth 002 - Nehru Park</SelectItem>
                    <SelectItem value="003">Booth 003 - Central Market</SelectItem>
                    <SelectItem value="004">Booth 004 - Railway Colony</SelectItem>
                    <SelectItem value="005">Booth 005 - Green Valley</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g., Business Owner, Teacher"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Voter Segment</Label>
                <Select value={formData.segment} onValueChange={(value) => setFormData({ ...formData, segment: value })}>
                  <SelectTrigger id="segment">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youth">Youth (18-35)</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="senior">Senior Citizen</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Government Schemes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Eligible Government Schemes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {schemes.map((scheme) => (
                <div key={scheme} className="flex items-center space-x-2">
                  <Checkbox
                    id={scheme}
                    checked={formData.schemes.includes(scheme)}
                    onCheckedChange={() => handleSchemeToggle(scheme)}
                  />
                  <label
                    htmlFor={scheme}
                    className="text-sm cursor-pointer"
                  >
                    {scheme}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information about the voter..."
              rows={3}
            />
          </div>

          {/* Document Upload */}
          <div>
            <Label>Upload Documents</Label>
            <div 
              onClick={handleFileClick}
              className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload voter ID, address proof, or other documents
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 5MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}):</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-900">{file.name}</p>
                        <p className="text-xs text-green-700">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Voter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
