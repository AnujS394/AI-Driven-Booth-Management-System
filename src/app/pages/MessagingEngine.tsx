import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { MessageSquare, Send, Users, MapPin, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const campaigns = [
  {
    id: 1,
    name: 'Scheme Awareness Campaign',
    segment: 'Farmers',
    channel: 'WhatsApp',
    sent: 5432,
    delivered: 5398,
    read: 4876,
    status: 'Completed',
    date: '2026-03-05',
  },
  {
    id: 2,
    name: 'Development Work Update',
    segment: 'All Voters',
    channel: 'SMS',
    sent: 24568,
    delivered: 24456,
    read: 18934,
    status: 'Completed',
    date: '2026-03-04',
  },
  {
    id: 3,
    name: 'Event Invitation - Youth Meet',
    segment: 'Youth Voters',
    channel: 'Push Notification',
    sent: 8765,
    delivered: 8654,
    read: 6234,
    status: 'Active',
    date: '2026-03-06',
  },
];

const campaignPerformance = [
  { date: 'Feb 27', sent: 12000, delivered: 11856, opened: 8945 },
  { date: 'Feb 28', sent: 15000, delivered: 14876, opened: 11234 },
  { date: 'Mar 1', sent: 18000, delivered: 17845, opened: 13567 },
  { date: 'Mar 2', sent: 14000, delivered: 13876, opened: 10456 },
  { date: 'Mar 3', sent: 16000, delivered: 15923, opened: 12345 },
  { date: 'Mar 4', sent: 20000, delivered: 19845, opened: 15234 },
  { date: 'Mar 5', sent: 17000, delivered: 16876, opened: 13456 },
];

const messageTemplates = [
  { id: 1, name: 'Scheme Launch Announcement', category: 'Announcement' },
  { id: 2, name: 'Development Work Update', category: 'Update' },
  { id: 3, name: 'Event Invitation', category: 'Event' },
  { id: 4, name: 'Survey Request', category: 'Survey' },
  { id: 5, name: 'Complaint Follow-up', category: 'Support' },
];

export default function MessagingEngine() {
  const [messageText, setMessageText] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedBooth, setSelectedBooth] = useState('all');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const estimatedReach = selectedSegment === 'farmers' ? 54034 :
                        selectedSegment === 'youth' ? 85987 :
                        selectedSegment === 'women' ? 117926 :
                        selectedSegment === 'business' ? 36852 :
                        selectedBooth ? 2145 :
                        245680;

  const handleSendCampaign = () => {
    if (selectedChannels.length === 0) {
      toast.error('Please select at least one communication channel.');
      return;
    }
    if (messageText.length === 0) {
      toast.error('Please enter a message.');
      return;
    }
    toast.success('Campaign sent successfully!');
  };

  const handleSaveAsDraft = () => {
    if (messageText.length === 0) {
      toast.error('Please enter a message before saving.');
      return;
    }
    toast.success('Campaign saved as draft successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messaging & Outreach Engine</h1>
        <p className="text-gray-600 mt-1">Create and manage communication campaigns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Campaigns</p>
            <MessageSquare className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold">156</h3>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Messages Sent</p>
            <Send className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold">1.8M</h3>
          <p className="text-sm text-green-600 mt-1">+23% vs last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Delivery Rate</p>
            <CheckCircle className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-3xl font-bold">98.4%</h3>
          <p className="text-sm text-gray-600 mt-1">Avg success rate</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Read Rate</p>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-3xl font-bold">76.2%</h3>
          <p className="text-sm text-green-600 mt-1">+4.5% improvement</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Campaign */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-xl font-semibold mb-6">Create New Campaign</h3>
          
          <div className="space-y-6">
            {/* Message Template */}
            <div>
              <Label htmlFor="template">Message Template (Optional)</Label>
              <Select>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {messageTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name} - {template.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message Content */}
            <div>
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {messageText.length} / 500 characters
              </p>
            </div>

            {/* Audience Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="segment">Target Segment</Label>
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger id="segment">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Voters</SelectItem>
                    <SelectItem value="farmers">Farmers</SelectItem>
                    <SelectItem value="youth">Youth (18-35)</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="business">Business Owners</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="booth">Specific Booth (Optional)</Label>
                <Select value={selectedBooth} onValueChange={setSelectedBooth}>
                  <SelectTrigger id="booth">
                    <SelectValue placeholder="All booths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Booths</SelectItem>
                    <SelectItem value="booth1">Booth 001 - Gandhi Nagar</SelectItem>
                    <SelectItem value="booth2">Booth 002 - Market Area</SelectItem>
                    <SelectItem value="booth3">Booth 003 - Station Road</SelectItem>
                    <SelectItem value="booth4">Booth 004 - College Area</SelectItem>
                    <SelectItem value="booth5">Booth 005 - Industrial Zone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Communication Channels */}
            <div>
              <Label className="mb-3 block">Communication Channels</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="whatsapp"
                    checked={selectedChannels.includes('whatsapp')}
                    onCheckedChange={() => handleChannelToggle('whatsapp')}
                  />
                  <label htmlFor="whatsapp" className="text-sm font-medium cursor-pointer">
                    WhatsApp
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sms"
                    checked={selectedChannels.includes('sms')}
                    onCheckedChange={() => handleChannelToggle('sms')}
                  />
                  <label htmlFor="sms" className="text-sm font-medium cursor-pointer">
                    SMS
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="push"
                    checked={selectedChannels.includes('push')}
                    onCheckedChange={() => handleChannelToggle('push')}
                  />
                  <label htmlFor="push" className="text-sm font-medium cursor-pointer">
                    Push Notification
                  </label>
                </div>
              </div>
            </div>

            {/* Estimated Reach */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Estimated Reach</p>
                    <h4 className="text-2xl font-bold text-blue-900">
                      {estimatedReach.toLocaleString()}
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Channels Selected</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {selectedChannels.length}
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSendCampaign}>
                <Send className="w-4 h-4 mr-2" />
                Send Campaign
              </Button>
            </div>
          </div>
        </Card>

        {/* Campaign Analytics */}
        <div className="space-y-6">
          {/* Message Preview */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Message Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[120px]">
              {messageText ? (
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{messageText}</p>
              ) : (
                <p className="text-sm text-gray-400 italic">Your message will appear here...</p>
              )}
            </div>
          </Card>

          {/* Recent Campaigns */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Campaigns</h3>
            <div className="space-y-3">
              {campaigns.slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{campaign.name}</h4>
                    <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Sent:</span>
                      <span className="font-medium">{campaign.sent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Read Rate:</span>
                      <span className="font-medium text-green-600">
                        {((campaign.read / campaign.sent) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Campaign Performance Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Campaign Performance (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={campaignPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="#3b82f6" name="Sent" />
            <Line type="monotone" dataKey="delivered" stroke="#10b981" name="Delivered" />
            <Line type="monotone" dataKey="opened" stroke="#f59e0b" name="Opened/Read" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Campaign History Table */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Campaign History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-700">Campaign Name</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Segment</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Channel</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Sent</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Delivered</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Read Rate</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-sm">{campaign.name}</p>
                      <p className="text-xs text-gray-500">{campaign.date}</p>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{campaign.segment}</td>
                  <td className="p-3">
                    <Badge variant="outline">{campaign.channel}</Badge>
                  </td>
                  <td className="p-3 text-sm">{campaign.sent.toLocaleString()}</td>
                  <td className="p-3 text-sm">{campaign.delivered.toLocaleString()}</td>
                  <td className="p-3 text-sm font-medium text-green-600">
                    {((campaign.read / campaign.sent) * 100).toFixed(1)}%
                  </td>
                  <td className="p-3">
                    <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}