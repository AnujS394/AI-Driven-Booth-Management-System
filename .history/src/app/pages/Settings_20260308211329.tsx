import { useState, useRef } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { 
  User,
  Bell,
  Lock,
  Database,
  Users,
  Palette,
  Shield,
  Upload,
  Save,
  Key,
  Mail,
  CheckCircle,
  Smartphone,
  UserCheck,
  AlertCircle,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';
import { downloadCSV, downloadJSON } from '../utils/exportUtils';
import { useUser } from '../context/UserContext';

export default function Settings() {
  const { userData, updateUserData } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile state
  const [tempProfile, setTempProfile] = useState({ ...userData });
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTimezone, setSelectedTimezone] = useState('ist');
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification sub-options
  const [emailSubOptions, setEmailSubOptions] = useState({
    campaignUpdates: true,
    workerActivity: true,
    voterFeedback: true,
    weeklySummaries: false,
    systemUpdates: true,
  });

  const [pushSubOptions, setPushSubOptions] = useState({
    urgentAlerts: true,
    taskAssignments: true,
    messageReplies: false,
    dailyReminders: true,
  });

  const handlePhotoChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setTempProfile({ ...tempProfile, photoUrl: imageUrl });
      toast.success('Photo uploaded! Click Save Changes to apply.');
    }
  };

  const handleSaveProfile = () => {
    if (!tempProfile.firstName.trim() || !tempProfile.lastName.trim()) {
      toast.error('First name and last name are required');
      return;
    }
    if (!tempProfile.email.trim() || !tempProfile.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    updateUserData({ ...tempProfile });
    toast.success('Profile settings saved successfully!');
  };

  const handleCancelProfile = () => {
    setTempProfile({ ...userData });
    toast.info('Changes discarded');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password updated successfully!');
  };

  const handleTwoFactorChange = (checked: boolean) => {
    setTwoFactorAuth(checked);
    if (checked) {
      toast.info('Two-factor authentication enabled. Please set up your authenticator app.');
    } else {
      toast.info('Two-factor authentication disabled');
    }
  };

  const handleSetup2FA = () => {
    toast.success('QR Code generated! Scan with your authenticator app.');
  };

  const handleRevokeSession = () => {
    toast.success('Session revoked successfully');
  };

  // API key management
  const [apiKeys, setApiKeys] = useState([
    { id: 1, label: 'Production API Key', key: 'pk_live_••••••••••••••5f2a', created: '2026-03-01' }
  ]);

  const handleGenerateAPIKey = () => {
    // create a fake key for demo
    const newKey = `pk_live_${Math.random().toString(36).substr(2, 16)}`;
    setApiKeys(prev => [...prev, { id: Date.now(), label: `Key ${prev.length + 1}`, key: newKey, created: new Date().toISOString().split('T')[0] }]);
    toast.success('New API key generated successfully');
  };

  const handleViewAPIKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.info('API key copied to clipboard');
  };

  const handleRevokeAPIKey = (id: number) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    toast.success('API key revoked');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved successfully!');
  };

  const handleResetNotifications = () => {
    setEmailNotifications(true);
    setPushNotifications(true);
    setSmsNotifications(false);
    setEmailSubOptions({
      campaignUpdates: true,
      workerActivity: true,
      voterFeedback: true,
      weeklySummaries: false,
      systemUpdates: true,
    });
    setPushSubOptions({
      urgentAlerts: true,
      taskAssignments: true,
      messageReplies: false,
      dailyReminders: true,
    });
    toast.info('Notification settings reset to default');
  };

  // team management
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Rajesh Kumar', role: 'Campaign Manager', email: 'rajesh@example.com', status: 'Active' },
    { name: 'Priya Sharma', role: 'Field Coordinator', email: 'priya@example.com', status: 'Active' },
    { name: 'Amit Verma', role: 'Data Analyst', email: 'amit@example.com', status: 'Active' },
    { name: 'Sunita Patel', role: 'Social Media Manager', email: 'sunita@example.com', status: 'Active' },
    { name: 'Vikram Singh', role: 'Operations Lead', email: 'vikram@example.com', status: 'Pending' },
  ]);

  const handleInviteMember = () => {
    const name = prompt('Enter name of new member');
    const email = prompt('Enter email of new member');
    if (name && email) {
      setTeamMembers(prev => [...prev, { name, role: 'Member', email, status: 'Pending' }]);
      toast.success('Invitation sent');
    }
  };

  const handleTeamAction = (email: string, action: string) => {
    setTeamMembers(prev => prev.map(m => {
      if (m.email !== email) return m;
      if (action === 'remove') return null;
      if (action === 'suspend') return { ...m, status: 'Suspended' };
      if (action === 'edit') {
        const newRole = prompt('Enter new role', m.role);
        return newRole ? { ...m, role: newRole } : m;
      }
      return m;
    }).filter(Boolean) as typeof teamMembers);

    if (action === 'remove') toast.success('Member removed from team');
    else if (action === 'suspend') toast.warning('Member suspended');
    else if (action === 'edit') toast.info('Member role updated');
  };

  const handleExportCSV = () => {
    // gather whatever application data is available; here we export a simple summary placeholder
    const appData = {
      users: 102,
      voters: 8425,
      reports: 34,
      projects: 12,
    };

    downloadCSV('app-data.csv', [appData]);
    toast.success('CSV download started');
  };

  const handleExportJSON = () => {
    const appData = {
      users: 102,
      voters: 8425,
      reports: 34,
      projects: 12,
    };

    downloadJSON('app-data.json', appData);
    toast.success('JSON download started');
  };

  const handleClearData = () => {
    toast.error('This action requires confirmation. Feature coming soon.');
  };

  const handleDeleteAccount = () => {
    toast.error('This action requires confirmation. Feature coming soon.');
  };

  const handleSaveAppearance = () => {
    toast.success('Appearance settings saved successfully!');
  };

  const handleResetAppearance = () => {
    setDarkMode(false);
    setSelectedLanguage('en');
    setSelectedTimezone('ist');
    toast.info('Appearance settings reset to default');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Profile Information</h3>
            </div>

            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {tempProfile.photoUrl ? (
                      <AvatarImage src={tempProfile.photoUrl} alt={`${tempProfile.firstName} ${tempProfile.lastName}`} />
                    ) : (
                      <AvatarFallback className="text-2xl bg-blue-600 text-white">
                        {tempProfile.firstName.charAt(0)}{tempProfile.lastName.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <button
                    onClick={handlePhotoChange}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <Button variant="outline" className="mb-2" onClick={handlePhotoChange}>
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 5MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={tempProfile.firstName}
                    onChange={(e) => setTempProfile({ ...tempProfile, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={tempProfile.lastName}
                    onChange={(e) => setTempProfile({ ...tempProfile, lastName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="constituency">Constituency</Label>
                  <Input 
                    id="constituency" 
                    value={tempProfile.constituency}
                    onChange={(e) => setTempProfile({ ...tempProfile, constituency: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="party">Political Party</Label>
                  <Input 
                    id="party" 
                    value={tempProfile.party}
                    onChange={(e) => setTempProfile({ ...tempProfile, party: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4} 
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCancelProfile}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>

          {/* Account Information */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Account ID</p>
                  <p className="text-sm text-gray-600">ADMIN-2024-001</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Account Created</p>
                  <p className="text-sm text-gray-600">{userData.memberSince}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Last Login</p>
                  <p className="text-sm text-gray-600">March 8, 2026 - 09:45 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Security Settings</h3>
            </div>

            <div className="space-y-6">
              {/* Change Password */}
              <div>
                <h4 className="font-medium mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleChangePassword}>
                    Update Password
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-600" />
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                  </div>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={handleTwoFactorChange} />
              </div>

              {twoFactorAuth && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Setup Authenticator App</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Scan the QR code with your authenticator app to enable 2FA
                      </p>
                      <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700" onClick={handleSetup2FA}>
                        Setup Now
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <Separator />

              {/* Active Sessions */}
              <div>
                <h4 className="font-medium mb-4">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Windows PC - Chrome</p>
                        <p className="text-sm text-gray-600">Delhi, India • Current session</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">iPhone - Safari</p>
                        <p className="text-sm text-gray-600">Delhi, India • 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleRevokeSession}>Revoke</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* API Keys */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">API Keys</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Manage API keys for integrating with external services
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Production API Key</p>
                  <p className="text-sm text-gray-600 font-mono">pk_live_••••••••••••••5f2a</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info('API key shown temporarily')}>
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success('API key revoked')}>
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
            <Button className="mt-4" variant="outline" onClick={handleGenerateAPIKey}>
              <Key className="w-4 h-4 mr-2" />
              Generate New Key
            </Button>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Notification Preferences</h3>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <h4 className="font-medium">Email Notifications</h4>
                    </div>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                {emailNotifications && (
                  <div className="ml-6 space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Campaign updates</span>
                      <Switch 
                        checked={emailSubOptions.campaignUpdates} 
                        onCheckedChange={(checked) => setEmailSubOptions({ ...emailSubOptions, campaignUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Worker activity reports</span>
                      <Switch 
                        checked={emailSubOptions.workerActivity} 
                        onCheckedChange={(checked) => setEmailSubOptions({ ...emailSubOptions, workerActivity: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Voter feedback alerts</span>
                      <Switch 
                        checked={emailSubOptions.voterFeedback} 
                        onCheckedChange={(checked) => setEmailSubOptions({ ...emailSubOptions, voterFeedback: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly summaries</span>
                      <Switch 
                        checked={emailSubOptions.weeklySummaries} 
                        onCheckedChange={(checked) => setEmailSubOptions({ ...emailSubOptions, weeklySummaries: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System updates</span>
                      <Switch 
                        checked={emailSubOptions.systemUpdates} 
                        onCheckedChange={(checked) => setEmailSubOptions({ ...emailSubOptions, systemUpdates: checked })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Push Notifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-600" />
                      <h4 className="font-medium">Push Notifications</h4>
                    </div>
                    <p className="text-sm text-gray-600">Receive push notifications on this device</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                {pushNotifications && (
                  <div className="ml-6 space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Urgent alerts</span>
                      <Switch 
                        checked={pushSubOptions.urgentAlerts} 
                        onCheckedChange={(checked) => setPushSubOptions({ ...pushSubOptions, urgentAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Task assignments</span>
                      <Switch 
                        checked={pushSubOptions.taskAssignments} 
                        onCheckedChange={(checked) => setPushSubOptions({ ...pushSubOptions, taskAssignments: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Message replies</span>
                      <Switch 
                        checked={pushSubOptions.messageReplies} 
                        onCheckedChange={(checked) => setPushSubOptions({ ...pushSubOptions, messageReplies: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily reminders</span>
                      <Switch 
                        checked={pushSubOptions.dailyReminders} 
                        onCheckedChange={(checked) => setPushSubOptions({ ...pushSubOptions, dailyReminders: checked })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* SMS Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                    <h4 className="font-medium">SMS Notifications</h4>
                  </div>
                  <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleResetNotifications}>Reset to Default</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Team Members</h3>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleInviteMember}>
                <UserCheck className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Rajesh Kumar', role: 'Campaign Manager', email: 'rajesh@example.com', status: 'Active' },
                { name: 'Priya Sharma', role: 'Field Coordinator', email: 'priya@example.com', status: 'Active' },
                { name: 'Amit Verma', role: 'Data Analyst', email: 'amit@example.com', status: 'Active' },
                { name: 'Sunita Patel', role: 'Social Media Manager', email: 'sunita@example.com', status: 'Active' },
                { name: 'Vikram Singh', role: 'Operations Lead', email: 'vikram@example.com', status: 'Pending' },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">{member.role}</p>
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </div>
                    <Select defaultValue="edit" onValueChange={(value) => {
                      if (value === 'edit') toast.info('Edit member dialog would open');
                      if (value === 'remove') toast.success('Member removed from team');
                      if (value === 'suspend') toast.warning('Member suspended');
                    }}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="remove">Remove</SelectItem>
                        <SelectItem value="suspend">Suspend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Roles & Permissions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Roles & Permissions</h3>
            <div className="space-y-4">
              {[
                { role: 'Campaign Manager', users: 2, permissions: 'Full Access' },
                { role: 'Field Coordinator', users: 12, permissions: 'Field Operations, Reporting' },
                { role: 'Data Analyst', users: 3, permissions: 'Read Analytics, Export Data' },
                { role: 'Worker', users: 145, permissions: 'Task Management, Field Reporting' },
              ].map((role) => (
                <div key={role.role} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{role.role}</p>
                    <p className="text-sm text-gray-600">{role.permissions}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{role.users} users</Badge>
                    <Button variant="outline" size="sm" onClick={() => toast.info('Edit role permissions dialog would open')}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Data Settings */}
        <TabsContent value="data" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Data Management</h3>
            </div>

            <div className="space-y-6">
              {/* Auto Backup */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Automatic Backups</h4>
                  <p className="text-sm text-gray-600">Daily automated backups of all data</p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={(checked) => {
                  setAutoBackup(checked);
                  toast.success(checked ? 'Auto backup enabled' : 'Auto backup disabled');
                }} />
              </div>

              <Separator />

              {/* Data Export */}
              <div>
                <h4 className="font-medium mb-4">Export Data</h4>
                <p className="text-sm text-gray-600 mb-4">Download a copy of your data in CSV or JSON format</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleExportCSV}>Export as CSV</Button>
                  <Button variant="outline" onClick={handleExportJSON}>Export as JSON</Button>
                </div>
              </div>

              <Separator />

              {/* Storage Usage */}
              <div>
                <h4 className="font-medium mb-4">Storage Usage</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Used Storage</span>
                      <span className="text-sm font-medium">3.2 GB / 10 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Voter Data</p>
                      <p className="text-lg font-bold">1.8 GB</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Media Files</p>
                      <p className="text-lg font-bold">1.1 GB</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Reports</p>
                      <p className="text-lg font-bold">300 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-200 bg-red-50">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-semibold text-red-900">Danger Zone</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-900">Clear All Data</p>
                  <p className="text-sm text-red-700">Permanently delete all campaign data</p>
                </div>
                <Button variant="destructive" onClick={handleClearData}>Clear Data</Button>
              </div>
              <Separator className="bg-red-200" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-900">Delete Account</p>
                  <p className="text-sm text-red-700">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Appearance Settings</h3>
            </div>

            <div className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={(checked) => {
                  setDarkMode(checked);
                  toast.info(checked ? 'Dark mode enabled' : 'Light mode enabled');
                }} />
              </div>

              <Separator />

              {/* Language */}
              <div>
                <Label htmlFor="language" className="mb-3 block">Language</Label>
                <Select value={selectedLanguage} onValueChange={(value) => {
                  setSelectedLanguage(value);
                  toast.success('Language preference updated');
                }}>
                  <SelectTrigger id="language" className="w-full md:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Timezone */}
              <div>
                <Label htmlFor="timezone" className="mb-3 block">Timezone</Label>
                <Select value={selectedTimezone} onValueChange={(value) => {
                  setSelectedTimezone(value);
                  toast.success('Timezone preference updated');
                }}>
                  <SelectTrigger id="timezone" className="w-full md:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="pst">America/Los_Angeles (PST)</SelectItem>
                    <SelectItem value="est">America/New_York (EST)</SelectItem>
                    <SelectItem value="gmt">Europe/London (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Color Scheme */}
              <div>
                <h4 className="font-medium mb-4">Accent Color</h4>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    { color: 'bg-blue-600', label: 'Blue' },
                    { color: 'bg-green-600', label: 'Green' },
                    { color: 'bg-purple-600', label: 'Purple' },
                    { color: 'bg-red-600', label: 'Red' },
                    { color: 'bg-orange-600', label: 'Orange' },
                    { color: 'bg-pink-600', label: 'Pink' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`${item.color} w-12 h-12 rounded-lg hover:scale-110 transition-transform ring-2 ring-offset-2 ring-transparent hover:ring-gray-400`}
                      title={item.label}
                      onClick={() => toast.success(`${item.label} theme applied`)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleResetAppearance}>Reset to Default</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAppearance}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
