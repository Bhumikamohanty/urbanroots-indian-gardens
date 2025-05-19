
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PackageOpen, Search, FileText } from 'lucide-react';

const orders = [
  {
    id: "ORD12345678",
    date: "2025-04-15",
    status: "delivered",
    total: 749,
    items: [
      {
        id: 1,
        name: "Tulsi (Holy Basil)",
        price: 120,
        quantity: 1,
        image: "https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690"
      },
      {
        id: 7,
        name: "Hand Trowel",
        price: 250,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1617692855273-2f6b7a874b1d?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 13,
        name: "Terracotta Pots (Set of 3)",
        price: 499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ORD12345679",
    date: "2025-03-28",
    status: "delivered",
    total: 1198,
    items: [
      {
        id: 4,
        name: "Aloe Vera",
        price: 200,
        quantity: 1,
        image: "https://plantlife.ie/wp-content/uploads/2022/10/alar1535__000000.jpg"
      },
      {
        id: 15,
        name: "Balcony Herb Garden Starter Kit",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ORD12345680",
    date: "2025-05-10",
    status: "processing",
    total: 649,
    items: [
      {
        id: 2,
        name: "Mint (Pudina)",
        price: 100,
        quantity: 1,
        image: "https://5.imimg.com/data5/SELLER/Default/2020/8/XQ/ED/UW/106270270/mint-pudina-.jpg"
      },
      {
        id: 11,
        name: "Organic Compost",
        price: 299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1598900438053-9e8f17c243ce?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 12,
        name: "Organic Neem Oil Spray",
        price: 199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593883698744-5f4536439ed5?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 8,
        name: "Garden Gloves",
        price: 199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620234226594-46f09f190bc9?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
];

const ProfileOrderHistory: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Shipped</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center">
            <PackageOpen className="h-5 w-5 mr-2 text-ur-green" />
            Order History
          </CardTitle>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Find Order
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <PackageOpen className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-base font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders yet. Start shopping to see your order history!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Ordered on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">₹{order.total.toFixed(2)}</span>
                    <Button variant="outline" size="sm" className="h-8">
                      <FileText className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="text-center">
                        <div className="w-full aspect-square rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs mt-1 truncate" title={item.name}>{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity} • ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileOrderHistory;
