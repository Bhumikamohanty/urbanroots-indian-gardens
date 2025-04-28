
import React from 'react';
import { ShopItem as ShopItemType } from '@/data/shopItems';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ShopItemProps {
  item: ShopItemType;
}

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
  const handleAddToCart = () => {
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <Card className="ur-card hover-glow animate-fade-in">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover hover-grow"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-ur-green">{item.name}</h3>
          <span className="ur-price text-lg">₹{item.price}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center mt-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < Math.floor(item.rating) ? "#FFD700" : "#E5E7EB"}
                className="h-4 w-4"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                  clipRule="evenodd" 
                />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">{item.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-ur-green hover:bg-ur-green/90 text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopItem;
