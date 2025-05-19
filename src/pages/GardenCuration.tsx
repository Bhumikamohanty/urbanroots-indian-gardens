
import React from 'react';
import GardenCurationForm from '@/components/curation/GardenCurationForm';

const GardenCuration: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Kitchen Garden Curation Assistant</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Let us help you transform your balcony into a thriving green escape tailored just for you.
            Share your preferences and we'll suggest the perfect plants and setup.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ur-container mt-8">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-ur-green mb-2">Curate Your Dream Balcony Garden</h2>
              <p className="text-gray-600">
                We believe no two gardens should be alike—because no two people are alike. Let us get to know 
                your space, your style, your climate, and your dreams so we can suggest the perfect plants, 
                layouts, and garden ideas just for you.
              </p>
            </div>
            
            <GardenCurationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenCuration;
