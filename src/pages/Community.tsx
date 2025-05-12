
import React from 'react';
import CommunityFeed from '@/components/community/CommunityFeed';

const Community: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-ur-green text-white py-12">
        <div className="ur-container">
          <h1 className="text-3xl font-bold mb-2">Community Garden Showcase</h1>
          <p className="text-white/90">
            Share your gardening journey and learn from fellow gardeners across India
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="ur-container mt-8">
        <CommunityFeed />
      </div>
    </div>
  );
};

export default Community;
