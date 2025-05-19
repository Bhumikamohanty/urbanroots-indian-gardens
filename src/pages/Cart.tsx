
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Plus, Minus, Trash, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, calculateTotal } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-ur-yellow/5 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-ur-green to-ur-blue py-8">
        <div className="ur-container">
          <h1 className="text-3xl font-bold text-white">My Cart</h1>
          <p className="text-white/80">
            {cart.length === 0 
              ? 'Your cart is empty' 
              : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
      </div>

      <div className="ur-container mt-8">
        {cart.length === 0 ? (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-gray-500">
                🛍️ Start adding some greenery to your life!
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => navigate('/shop')}
                  className="bg-ur-green hover:bg-ur-green/90 text-white"
                  size="lg"
                >
                  Go to Shop
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">My Cart</h2>
                    <p className="text-gray-500">
                      {cart.length} item{cart.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 py-4 border-b border-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-24 w-24 rounded-md object-cover"
                      />
                      <div className="flex-grow space-y-1">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                        <p className="text-ur-green font-medium">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    className="border-ur-blue text-ur-blue hover:bg-ur-blue/10"
                    onClick={() => navigate('/shop')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges:</span>
                    <span className={calculateTotal() > 499 ? "text-green-600" : ""}>
                      {calculateTotal() > 499 ? 'Free' : `₹99.00`}
                    </span>
                  </div>
                  {calculateTotal() > 499 ? (
                    <div className="text-green-600 text-sm">
                      ✓ Free delivery on orders above ₹499
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Add ₹{(499 - calculateTotal()).toFixed(2)} more to get free delivery
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span>₹{(calculateTotal() + (calculateTotal() > 499 ? 0 : 99)).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-ur-green hover:bg-ur-green/90 text-white" size="lg">
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Delivery Information</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Plants are carefully wrapped and shipped in eco-friendly packaging. Most orders are delivered within 3-5 business days.
                  </p>
                  <h3 className="font-medium mb-2">Secure Checkout</h3>
                  <p className="text-sm text-gray-500">
                    All transactions are secure and your information is protected.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
