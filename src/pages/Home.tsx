
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, ShoppingCart, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ur-green/90 to-ur-blue/90 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1598880940371-c756e015fea2?q=80&w=1920&auto=format&fit=crop" 
            alt="Indian Balcony Garden" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="ur-container relative z-10 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="ur-title text-white">Bring Nature to Your Indian Home</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Easily grow plants in your balcony or terrace garden with our expert guidance and quality plants.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button 
                  size="lg" 
                  className="bg-white text-ur-green hover:bg-ur-yellow hover:text-ur-green"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Plants
                </Button>
              </Link>
              <Link to="/learn">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn Gardening
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="ur-section bg-white">
        <div className="ur-container">
          <h2 className="ur-section-title">Benefits of Balcony Gardening</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-ur-yellow/10 rounded-lg hover-lift">
              <div className="w-16 h-16 mb-4 bg-ur-yellow rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ur-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ur-green mb-2">Fresh Air</h3>
              <p className="text-gray-600">Plants naturally purify air, removing toxins and increasing oxygen levels in your home.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-ur-blue/10 rounded-lg hover-lift">
              <div className="w-16 h-16 mb-4 bg-ur-blue rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ur-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ur-green mb-2">Mental Wellness</h3>
              <p className="text-gray-600">Gardening reduces stress and anxiety, promoting better mental health and relaxation.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-ur-orange/10 rounded-lg hover-lift">
              <div className="w-16 h-16 mb-4 bg-ur-orange rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ur-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ur-green mb-2">Homegrown Food</h3>
              <p className="text-gray-600">Grow your own herbs and vegetables for fresh, pesticide-free ingredients in your kitchen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="ur-section bg-gray-50">
        <div className="ur-container">
          <h2 className="ur-section-title">Popular Indian Plants for Home</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Plant Card 1 */}
            <div className="ur-card overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690"
                  alt="Tulsi"
                  className="w-full h-full object-cover hover-grow"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-ur-green">Tulsi (Holy Basil)</h3>
                <p className="text-sm text-gray-500 mb-2">Sacred medicinal herb</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="ur-price">₹120</span>
                  <Link to="/shop">
                    <Button size="sm" className="bg-ur-green hover:bg-ur-green/90 text-white">View More</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Plant Card 2 */}
            <div className="ur-card overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://www.teojooguan.com/wp-content/uploads/2022/05/aloe-vera-plant-pot.jpg"
                  alt="Aloe Vera"
                  className="w-full h-full object-cover hover-grow"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-ur-green">Aloe Vera</h3>
                <p className="text-sm text-gray-500 mb-2">Medicinal succulent</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="ur-price">₹200</span>
                  <Link to="/shop">
                    <Button size="sm" className="bg-ur-green hover:bg-ur-green/90 text-white">View More</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Plant Card 3 */}
            <div className="ur-card overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://5.imimg.com/data5/SELLER/Default/2020/8/XQ/ED/UW/106270270/mint-pudina-.jpg"
                  alt="Mint"
                  className="w-full h-full object-cover hover-grow"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-ur-green">Mint (Pudina)</h3>
                <p className="text-sm text-gray-500 mb-2">Culinary herb</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="ur-price">₹100</span>
                  <Link to="/shop">
                    <Button size="sm" className="bg-ur-green hover:bg-ur-green/90 text-white">View More</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Plant Card 4 */}
            <div className="ur-card overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://www.teojooguan.com/wp-content/uploads/2020/09/Curry-Leaves-Plant.jpeg"
                  alt="Curry Leaves"
                  className="w-full h-full object-cover hover-grow"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-ur-green">Curry Leaves</h3>
                <p className="text-sm text-gray-500 mb-2">Essential for tadka</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="ur-price">₹150</span>
                  <Link to="/shop">
                    <Button size="sm" className="bg-ur-green hover:bg-ur-green/90 text-white">View More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/shop">
              <Button size="lg" className="bg-ur-green hover:bg-ur-green/90 text-white">
                <ShoppingCart className="mr-2 h-5 w-5" />
                View All Plants
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ur-section bg-white">
        <div className="ur-container">
          <h2 className="ur-section-title">What Our Gardening Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-ur-orange/20 flex items-center justify-center mr-4">
                  <span className="text-ur-orange font-bold">RS</span>
                </div>
                <div>
                  <h4 className="font-bold">Rajesh Sharma</h4>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
              <p className="text-gray-700">
                "UrbanRoots helped me transform my tiny Mumbai balcony into a green paradise. 
                The Mint and Tulsi plants are thriving and I use them daily in my cooking!"
              </p>
              <div className="mt-4 flex text-ur-orange">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-ur-blue/20 flex items-center justify-center mr-4">
                  <span className="text-ur-blue font-bold">AP</span>
                </div>
                <div>
                  <h4 className="font-bold">Anjali Patel</h4>
                  <p className="text-sm text-gray-500">Bangalore</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a first-time gardener, the tutorials on UrbanRoots were incredibly helpful. 
                My Aloe Vera plants are now thriving and I've even started making homemade skin care products!"
              </p>
              <div className="mt-4 flex text-ur-orange">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-ur-green/20 flex items-center justify-center mr-4">
                  <span className="text-ur-green font-bold">VK</span>
                </div>
                <div>
                  <h4 className="font-bold">Vikram Kumar</h4>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I've turned my Delhi apartment terrace into a productive vegetable garden 
                with tomatoes and chillies. The plant tracking feature helps me remember when to water everything!"
              </p>
              <div className="mt-4 flex text-ur-orange">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ur-green py-16">
        <div className="ur-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Green Journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Indian gardening enthusiasts who are bringing nature 
            into their homes with UrbanRoots.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-ur-green hover:bg-ur-yellow hover:text-ur-green"
              >
                <Leaf className="mr-2 h-5 w-5" />
                Start Growing Today
              </Button>
            </Link>
            <Link to="/shop">
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Explore Plants
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
