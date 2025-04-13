
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    autoplayVideos: true,
    downloadEnabled: true,
    twoFactorAuth: false,
    sessionTimeout: "30", // Minutes
    dataSharing: false
  });
  
  const handleToggle = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
    
    // Show a toast for the change
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${!settings[setting] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Authentication Required",
      description: "To enable account deletion, please connect to Supabase.",
      variant: "destructive",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth" className="font-medium">Two-factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={() => handleToggle('twoFactorAuth')}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    min="5"
                    max="120"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordReset">Password Reset</Label>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Authentication Required",
                      description: "To enable password reset, please connect to Supabase.",
                    });
                  }}>
                    Reset Password
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive updates, course announcements, and promotional offers via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive booking confirmations and reminders via SMS
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleToggle('smsNotifications')}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-500">
                    Switch between light and dark theme
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggle('darkMode')}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Content Preferences</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoplayVideos" className="font-medium">Autoplay Videos</Label>
                  <p className="text-sm text-gray-500">
                    Automatically play videos when viewing course content
                  </p>
                </div>
                <Switch
                  id="autoplayVideos"
                  checked={settings.autoplayVideos}
                  onCheckedChange={() => handleToggle('autoplayVideos')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="downloadEnabled" className="font-medium">Enable Downloads</Label>
                  <p className="text-sm text-gray-500">
                    Allow downloading of course materials for offline access
                  </p>
                </div>
                <Switch
                  id="downloadEnabled"
                  checked={settings.downloadEnabled}
                  onCheckedChange={() => handleToggle('downloadEnabled')}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Privacy</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing" className="font-medium">Data Sharing</Label>
                  <p className="text-sm text-gray-500">
                    Share usage data to help improve our services
                  </p>
                </div>
                <Switch
                  id="dataSharing"
                  checked={settings.dataSharing}
                  onCheckedChange={() => handleToggle('dataSharing')}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader className="text-red-600">
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription className="text-red-500">
              Permanent actions that cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-600 mb-1">Delete Account</h4>
                <p className="text-sm text-red-600 mb-3">
                  This will permanently delete your account, all your data, and course progress. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
