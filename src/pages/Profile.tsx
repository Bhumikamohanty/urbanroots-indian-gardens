
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { 
  User, Mail, Phone, MapPin, ShoppingBag, Bell, Star, 
  Users, Clock, FileText, LogOut, Settings, Edit, Trash,
  Home, Calendar as CalendarIcon, Plus, Minus
} from 'lucide-react';
import { shopItems } from '@/data/shopItems';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import ProfileReminders from '@/components/profile/ProfileReminders';
import ProfileReviews from '@/components/profile/ProfileReviews';
import ProfileCommunities from '@/components/profile/ProfileCommunities';
import ProfileOrderHistory from '@/components/profile/ProfileOrderHistory';
import ProfileActivityLog from '@/components/profile/ProfileActivityLog';
import ProfileSettings from '@/components/profile/ProfileSettings';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, calculateTotal } = useCart();
  
  const [userProfile, setUserProfile] = useState({
    name: 'Aryan Patel',
    email: 'aryan.p@example.com',
    phone: '+91 98765 43210',
    address: '402, Green Terraces, Bandra West, Mumbai - 400050',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&auto=format',
    bio: 'Passionate urban gardener with 2 years of experience growing herbs and vegetables in my apartment balcony. Love experimenting with organic growing methods!'
  });

  const handleProfileSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success('You have been logged out');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-ur-yellow/10 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-ur-green to-ur-blue py-8">
        <div className="ur-container">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-white/80">Manage your account and view your gardening journey</p>
        </div>
      </div>

      <div className="ur-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - User Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback className="text-2xl bg-ur-green text-white">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{userProfile.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Badge variant="outline" className="bg-ur-green/10 text-ur-green border-ur-green/20">
                    Urban Gardener
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-ur-brown mt-1" />
                  <span className="text-sm">{userProfile.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-ur-brown mt-1" />
                  <span className="text-sm">{userProfile.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-ur-brown mt-1" />
                  <span className="text-sm">{userProfile.address}</span>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-semibold text-ur-green">12</div>
                    <div className="text-xs text-gray-500">Plants</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-ur-orange">5</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-ur-blue">3</div>
                    <div className="text-xs text-gray-500">Reviews</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="w-full border-ur-green text-ur-green hover:bg-ur-green hover:text-white"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/my-plants')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  My Plants Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/shop')}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop Plants & Supplies
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/learn')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Learning Resources
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/community')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community Garden
                </Button>
                <Separator />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      value={userProfile.name} 
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email"
                      value={userProfile.email} 
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input 
                      value={userProfile.phone} 
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Textarea 
                      value={userProfile.address} 
                      onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea 
                      value={userProfile.bio} 
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Picture URL</label>
                    <Input 
                      value={userProfile.avatar} 
                      onChange={(e) => setUserProfile({...userProfile, avatar: e.target.value})}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleProfileSave}>Save Changes</Button>
                </CardFooter>
              </Card>
            ) : (
              <Tabs defaultValue="cart">
                <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6">
                  <TabsTrigger value="cart" className="text-xs md:text-sm">
                    <ShoppingBag className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Cart
                  </TabsTrigger>
                  <TabsTrigger value="reminders" className="text-xs md:text-sm">
                    <Bell className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Reminders
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-xs md:text-sm">
                    <Star className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="communities" className="text-xs md:text-sm">
                    <Users className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Communities
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="text-xs md:text-sm">
                    <ShoppingBag className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="text-xs md:text-sm">
                    <Clock className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-xs md:text-sm">
                    <Settings className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                {/* Cart Tab */}
                <TabsContent value="cart">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>My Cart</CardTitle>
                        <CardDescription>
                          {cart.length === 0 
                            ? 'Your cart is empty' 
                            : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="default" 
                        className="bg-ur-green hover:bg-ur-green/90 text-white"
                        disabled={cart.length === 0}
                        onClick={() => navigate('/cart')}
                      >
                        View Full Cart
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {cart.length === 0 ? (
                        <div className="text-center py-6">
                          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Start adding some plants or gardening supplies to your cart!
                          </p>
                          <div className="mt-6">
                            <Button
                              onClick={() => navigate('/shop')}
                              className="bg-ur-green hover:bg-ur-green/90 text-white"
                            >
                              Go to Shop
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cart.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 py-2 border-b border-gray-100">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-5 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          {cart.length > 3 && (
                            <div className="text-center text-sm text-gray-500">
                              +{cart.length - 3} more items in cart
                            </div>
                          )}
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="font-medium">₹{calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-green-600">
                              <span>Delivery:</span>
                              <span>
                                {calculateTotal() > 499 ? 'Free' : `₹99.00`}
                              </span>
                            </div>
                            <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t border-dashed border-gray-200">
                              <span>Total:</span>
                              <span>₹{(calculateTotal() + (calculateTotal() > 499 ? 0 : 99)).toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between mt-6">
                            <Button 
                              variant="outline" 
                              className="border-ur-blue text-ur-blue hover:bg-ur-blue hover:text-white"
                              onClick={() => navigate('/shop')}
                            >
                              Continue Shopping
                            </Button>
                            <Button 
                              className="bg-ur-green hover:bg-ur-green/90 text-white"
                            >
                              Proceed to Checkout
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reminders Tab */}
                <TabsContent value="reminders">
                  <ProfileReminders />
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <ProfileReviews />
                </TabsContent>
                
                {/* Communities Tab */}
                <TabsContent value="communities">
                  <ProfileCommunities />
                </TabsContent>
                
                {/* Order History Tab */}
                <TabsContent value="orders">
                  <ProfileOrderHistory />
                </TabsContent>
                
                {/* Activity Log Tab */}
                <TabsContent value="activity">
                  <ProfileActivityLog />
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings">
                  <ProfileSettings onLogout={handleLogout} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
