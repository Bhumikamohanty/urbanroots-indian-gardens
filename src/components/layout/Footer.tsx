
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ur-green text-white py-10">
      <div className="ur-container">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-white" />
              <span className="text-2xl font-rajdhani font-bold">
                Urban<span className="text-ur-yellow">Roots</span>
              </span>
            </div>
            <p className="text-sm mb-6">
              Bringing green life to Indian homes and balconies. 
              Grow your own plants, herbs, and vegetables with our 
              expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-ur-yellow">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-ur-yellow">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-ur-yellow">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-ur-yellow">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 font-rajdhani">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-ur-yellow transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-ur-yellow transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-ur-yellow transition-colors">Learn</Link>
              </li>
              <li>
                <Link to="/my-plants" className="hover:text-ur-yellow transition-colors">My Plants</Link>
              </li>
            </ul>
          </div>

          {/* Plant Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 font-rajdhani">Plant Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-ur-yellow transition-colors">Herbs</a>
              </li>
              <li>
                <a href="#" className="hover:text-ur-yellow transition-colors">Vegetables</a>
              </li>
              <li>
                <a href="#" className="hover:text-ur-yellow transition-colors">Flowering Plants</a>
              </li>
              <li>
                <a href="#" className="hover:text-ur-yellow transition-colors">Indoor Plants</a>
              </li>
              <li>
                <a href="#" className="hover:text-ur-yellow transition-colors">Balcony Plants</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 font-rajdhani">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">UrbanRoots Garden Center</p>
              <p className="mb-2">123 Green Street, Bangalore</p>
              <p className="mb-2">Karnataka, India - 560001</p>
              <p className="mb-2">Phone: +91 9876543210</p>
              <p>Email: info@urbanroots.in</p>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-white/20 text-center text-sm">
          <p>&copy; {currentYear} UrbanRoots. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="hover:text-ur-yellow mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ur-yellow mr-4">Terms of Service</Link>
            <Link to="/faq" className="hover:text-ur-yellow">FAQ</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
