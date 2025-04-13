
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, Upload } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  
  // User profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 90 1234 5678",
    address: "123 Main Street, Asaba, Delta, Nigeria",
    bio: "I am a passionate learner interested in technology and business development. Currently working on improving my skills in web development and AI.",
    education: "Bachelor of Science, Computer Science",
    occupation: "Software Developer",
    interests: ["Artificial Intelligence", "Web Development", "Blockchain", "Data Analysis"]
  });
  
  // Form state
  const [formData, setFormData] = useState({ ...profile });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSaveProfile = () => {
    setProfile({ ...formData });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleResetPassword = () => {
    toast({
      title: "Authentication Required",
      description: "To enable password reset, please connect to Supabase.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-forest text-white text-xl">JD</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl mb-1">{profile.name}</CardTitle>
            <p className="text-gray-500">{profile.occupation}</p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                <span>{profile.address}</span>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium mb-2">Learning Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                    Courses Enrolled
                  </span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-gray-400" />
                    Courses Completed
                  </span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    Learning Hours
                  </span>
                  <span className="font-medium">32</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Edit Tabs */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="account">Account Settings</TabsTrigger>
                  <TabsTrigger value="password">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
                        value={formData.bio}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="account" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-forest text-white">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Upload size={16} />
                            <span>Upload Image</span>
                          </Button>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, GIF or PNG. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="notification-courses"
                            defaultChecked
                          />
                          <Label htmlFor="notification-courses" className="font-normal">
                            Course updates and announcements
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="notification-services"
                            defaultChecked
                          />
                          <Label htmlFor="notification-services" className="font-normal">
                            Service bookings and reminders
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="notification-promotions"
                          />
                          <Label htmlFor="notification-promotions" className="font-normal">
                            Promotions and special offers
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
                      >
                        <option value="GMT+1">West Africa Time (GMT+1)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                        <option value="GMT-5">Eastern Standard Time (GMT-5)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button onClick={handleSaveProfile}>Save Preferences</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="password" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-gray-500">
                        Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button onClick={handleResetPassword}>Update Password</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
