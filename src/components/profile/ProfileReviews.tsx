
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Edit, Trash } from 'lucide-react';

const reviews = [
  {
    id: 1,
    productName: "Tulsi (Holy Basil)",
    productImage: "https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690",
    rating: 5,
    date: "2025-04-15",
    review: "I've been growing Tulsi for a month now, and it's thriving on my balcony! The holy basil has a wonderful aroma, and I use it daily for tea. Perfect addition to my small herb garden.",
    helpful: 12,
    category: "Plant"
  },
  {
    id: 2,
    productName: "Hand Trowel",
    productImage: "https://images.unsplash.com/photo-1617692855273-2f6b7a874b1d?q=80&w=800&auto=format&fit=crop",
    rating: 4,
    date: "2025-03-28",
    review: "Sturdy and well-made garden trowel. The handle is comfortable to grip, and the metal blade is strong enough for my balcony gardening needs. Would recommend!",
    helpful: 5,
    category: "Tool"
  },
  {
    id: 3,
    productName: "Balcony Herb Garden Starter Kit",
    productImage: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=800&auto=format&fit=crop",
    rating: 5,
    date: "2025-02-10",
    review: "This starter kit has everything you need to begin your herb garden journey! The pots are the perfect size for my windowsill, and all the herbs germinated within a week. Great quality soil and seeds.",
    helpful: 8,
    category: "Kit"
  }
];

const ProfileReviews: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">My Reviews</CardTitle>
          <Button variant="outline" size="sm" className="text-ur-green border-ur-green/30">
            Filter Reviews
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <div className="text-center py-10">
            <Star className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-base font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't written any reviews yet. Share your experience with products you've purchased!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={review.productImage} 
                      alt={review.productName} 
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{review.productName}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-xs text-gray-500">
                          Reviewed on {new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <span className="inline-block mt-1 text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {review.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{review.review}</p>
                <div className="mt-4 flex items-center text-sm">
                  <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-700">
                    <span>{review.helpful} people found this helpful</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileReviews;
