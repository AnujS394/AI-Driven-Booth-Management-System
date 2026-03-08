import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { BarChart3, TrendingUp, Map, Database, Lock, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

import { login } from '../services/auth';
import { useUser } from '../context/UserContext';

export default function Login() {
  const navigate = useNavigate();

  const { updateUserData } = useUser();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ identifier, password });
      updateUserData(user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info('Password reset link sent to your email!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Icons - Background Illustration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <BarChart3 className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-float-delayed">
          <TrendingUp className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-20 animate-float">
          <Map className="w-14 h-14 text-white" />
        </div>
        <div className="absolute bottom-20 right-32 opacity-20 animate-float-delayed">
          <Database className="w-10 h-10 text-white" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-20 animate-float">
          <Users className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-10 animate-float-delayed">
          <Shield className="w-20 h-20 text-white" />
        </div>
      </div>

      <Card className="w-full max-w-md relative z-10 p-8 bg-white/95 backdrop-blur shadow-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Political Intelligence Platform</h1>
          <p className="text-gray-600">Secure access to your campaign dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email / Phone Number</Label>
            <Input 
              id="identifier" 
              type="text" 
              placeholder="Enter your email or phone"
              className="h-11"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              className="h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={loading}>
            <Lock className="w-4 h-4 mr-2" />
            {loading ? 'Signing in...' : 'Login to Dashboard'}
          </Button>

          <div className="text-center">
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Secure • Encrypted • Compliant
          </p>
          <div className="mt-3">
            <a href="/worker-app" className="text-blue-600 hover:text-blue-700 text-xs hover:underline">
              Access Mobile Worker App →
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
