import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Upload,
  Save,
  Edit,
  X,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { useUser, UserData } from '../context/UserContext';

export default function Profile() {
  const { userData, updateUserData } = useUser();

  if (!userData) {
    return <div>Loading profile...</div>;
  }
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempData, setTempData] = useState<UserData>(userData);

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      
      if (isEditing) {
        setTempData({ ...tempData, photoUrl: imageUrl });
      } else {
        updateUserData({ ...userData, photoUrl: imageUrl });
        setTempData({ ...tempData, photoUrl: imageUrl });
      }
      
      toast.success('Photo uploaded successfully!');
    }
  };

  const handleEditProfile = () => {
    if (!isEditing) {
      // Start editing - copy current data to temp
      setTempData({ ...userData });
      setIsEditing(true);
      toast.info('Edit mode enabled');
    } else {
      // Cancel editing
      handleCancel();
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleSaveChanges = () => {
    // Validate required fields
    if (!tempData.firstName.trim() || !tempData.lastName.trim()) {
      toast.error('First name and last name are required');
      return;
    }

    if (!tempData.email.trim() || !tempData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!tempData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }

    // Save changes
    updateUserData({ ...tempData });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setIsEditing(false);
    toast.info('Changes discarded');
  };

  const displayData = isEditing ? tempData : userData;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <Avatar className="w-32 h-32 mb-4">
                {displayData.photoUrl ? (
                  <AvatarImage src={displayData.photoUrl} alt={`${displayData.firstName} ${displayData.lastName}`} />
                ) : (
                  <AvatarFallback className="text-3xl bg-blue-600 text-white">
                    {displayData.firstName.charAt(0)}{displayData.lastName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              {isEditing && (
                <button
                  onClick={handleChangePhoto}
                  className="absolute bottom-4 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {displayData.firstName} {displayData.lastName}
            </h2>
            <p className="text-gray-600">{displayData.role}</p>
            <Badge className="mt-2 bg-green-500">Active</Badge>
            
            <Button className="w-full mt-6" variant="outline" onClick={handleChangePhoto}>
              <Upload className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-gray-500">Email</p>
                <p className="font-medium truncate">{displayData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{displayData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{displayData.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-gray-500">Member Since</p>
                <p className="font-medium">{displayData.memberSince}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Information Form */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <Button 
              variant={isEditing ? "ghost" : "outline"} 
              size="sm" 
              onClick={handleEditProfile}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName" 
                  value={displayData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300' : ''}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName" 
                  value={displayData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300' : ''}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={displayData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300' : ''}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={displayData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300' : ''}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="role">Role / Position</Label>
              <Input 
                id="role" 
                value={displayData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                disabled={!isEditing}
                className={isEditing ? 'border-blue-300' : ''}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="constituency">Constituency</Label>
                <Input 
                  id="constituency" 
                  value={displayData.constituency}
                  onChange={(e) => handleInputChange('constituency', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300' : ''}
                />
              </div>
              <div>
                <Label htmlFor="party">Political Party</Label>
                <Input 
                  id="party" 
                  value={displayData.party}
                  onChange={(e) => handleInputChange('party', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300' : ''}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={displayData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className={isEditing ? 'border-blue-300' : ''}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                rows={4}
                value={displayData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                className={isEditing ? 'border-blue-300' : ''}
              />
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-4">Social Media Links</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input 
                    id="twitter" 
                    placeholder="https://twitter.com/username" 
                    value={displayData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'border-blue-300' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    placeholder="https://linkedin.com/in/username" 
                    value={displayData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'border-blue-300' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    placeholder="https://facebook.com/username" 
                    value={displayData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'border-blue-300' : ''}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700" 
                  onClick={handleSaveChanges}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Campaigns</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Voters Reached</p>
              <p className="text-2xl font-bold">245K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Booths</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Days Active</p>
              <p className="text-2xl font-bold">428</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
