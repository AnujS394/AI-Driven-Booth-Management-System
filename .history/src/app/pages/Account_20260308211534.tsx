import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { 
  CreditCard,
  Lock,
  Shield,
  Bell,
  Mail,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Key,
  Trash2,
  Download
} from 'lucide-react';

export default function Account() {
  // simple api key management for account page
  const [apiKeys, setApiKeys] = useState([
    { id: 1, label: 'Production API Key', key: 'pk_live_••••••••••••••5f2a', created: '2026-03-01' }
  ]);

  const handleGenerateAPIKey = () => {
    const newKey = `pk_live_${Math.random().toString(36).substr(2, 16)}`;
    setApiKeys(prev => [...prev, { id: Date.now(), label: `Key ${prev.length + 1}`, key: newKey, created: new Date().toISOString().split('T')[0] }]);
    toast.success('New API key generated');
  };

  const handleViewAPIKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.info('API key copied');
  };

  const handleRevokeAPIKey = (id: number) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    toast.success('API key revoked');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account security and preferences</p>
      </div>

      {/* Account Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Account Status: Active</h3>
              <p className="text-sm text-gray-600">Your account is in good standing</p>
            </div>
          </div>
          <Badge className="bg-green-500">Verified</Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">Security</h3>
          </div>

          <div className="space-y-6">
            {/* Change Password */}
            <div>
              <h4 className="font-medium mb-4">Change Password</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>

            <Separator />

            {/* Active Sessions */}
            <div>
              <h4 className="font-medium mb-4">Active Sessions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Windows PC - Chrome</p>
                      <p className="text-xs text-gray-600">Delhi, India • Current session</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">iPhone - Safari</p>
                      <p className="text-xs text-gray-600">Delhi, India • 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Revoke</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Billing & Subscription */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">Billing & Subscription</h3>
          </div>

          <div className="space-y-6">
            {/* Current Plan */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">Professional Plan</h4>
                <Badge className="bg-blue-600">Active</Badge>
              </div>
              <p className="text-sm text-blue-700 mb-3">Full access to all features</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-900">₹49,999</span>
                <span className="text-sm text-blue-700">/month</span>
              </div>
              <p className="text-xs text-blue-600 mt-2">Renews on April 15, 2026</p>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="font-medium mb-3">Payment Method</h4>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/2027</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>

            <Separator />

            {/* Billing History */}
            <div>
              <h4 className="font-medium mb-3">Recent Invoices</h4>
              <div className="space-y-2">
                {[
                  { date: 'March 1, 2026', amount: '₹49,999', status: 'Paid' },
                  { date: 'February 1, 2026', amount: '₹49,999', status: 'Paid' },
                  { date: 'January 1, 2026', amount: '₹49,999', status: 'Paid' },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{invoice.date}</p>
                      <p className="text-xs text-gray-600">{invoice.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full">
              View All Invoices
            </Button>
          </div>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Notification Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-600">Browser notifications</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Critical alerts only</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-gray-600">Summary emails</p>
                </div>
              </div>
              <Switch defaultChecked />
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
          {apiKeys.map(key => (
            <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{key.label}</p>
                <p className="text-sm text-gray-600 font-mono">
                  {key.key.length > 20 ? key.key.slice(0, 8) + '••••••' + key.key.slice(-4) : key.key}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleViewAPIKey(key.key)}>
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRevokeAPIKey(key.id)}>
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4" variant="outline" onClick={handleGenerateAPIKey}>
          <Key className="w-4 h-4 mr-2" />
          Generate New Key
        </Button>
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
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-red-700">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
