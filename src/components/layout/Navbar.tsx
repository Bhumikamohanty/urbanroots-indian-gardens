import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Leaf, ShoppingCart, BookOpen, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/hooks/useCart';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="ur-container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-ur-green" />
          <span className="text-2xl font-rajdhani font-bold text-ur-green">
            Urban<span className="text-ur-brown">Roots</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          {isAuthenticated && (
            <Link to="/my-plants" className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              <span>My Plants</span>
            </Link>
          )}

          <Link to="/shop" className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            <span>Shop</span>
          </Link>

          <Link to="/learn" className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Learn</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-1"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                </Button>
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-ur-green text-white text-[10px] min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-1"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
              <Link to="/profile">
                <Button variant="outline" className="bg-ur-green text-white hover:bg-ur-green/90 border-none">
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-ur-green hover:text-ur-green/90">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-ur-green text-white hover:bg-ur-green/90">Sign Up</Button>
              </Link>
              <Link to="/cart" className="relative">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-ur-green p-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-ur-green text-white text-[10px] min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-ur-green" />
          ) : (
            <Menu className="h-6 w-6 text-ur-green" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 bg-white border-t border-gray-100 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/my-plants"
                className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Leaf className="h-4 w-4" />
                <span>My Plants</span>
              </Link>
            )}

            <Link
              to="/shop"
              className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Shop</span>
            </Link>

            <Link
              to="/learn"
              className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              <span>Learn</span>
            </Link>

            <Link
              to="/cart"
              className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <Badge
                  className="ml-1 px-1.5 py-0.5 bg-ur-green text-white text-[10px]"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  className="text-gray-700 hover:text-ur-green font-medium flex items-center gap-2 py-2"
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Link
                  to="/login"
                  className="bg-white border border-ur-green text-ur-green py-2 px-4 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-ur-green text-white py-2 px-4 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
