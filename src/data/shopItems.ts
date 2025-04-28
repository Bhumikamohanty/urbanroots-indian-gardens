
export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
}

export const shopItems: ShopItem[] = [
  {
    id: "1",
    name: "Tulsi (Holy Basil)",
    price: 120,
    description: "Sacred plant for Indian households. Medicinal properties and religious significance.",
    image: "https://images.unsplash.com/photo-1596634608283-8c6ab1a0a1ae?q=80&w=500&auto=format&fit=crop",
    category: "Herb",
    inStock: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Mint (Pudina)",
    price: 100,
    description: "Fresh mint leaves for cooking. Adds amazing flavor to chutney, raita, and chai.",
    image: "https://images.unsplash.com/photo-1563804447974-0e7163fb74aa?q=80&w=500&auto=format&fit=crop",
    category: "Herb",
    inStock: true,
    rating: 4.5
  },
  {
    id: "3",
    name: "Curry Leaves (Kadi Patta)",
    price: 150,
    description: "Essential for Indian tadka. The aromatic leaves add authentic flavor to south Indian dishes.",
    image: "https://images.unsplash.com/photo-1589918239875-dabb266c523c?q=80&w=500&auto=format&fit=crop",
    category: "Herb",
    inStock: true,
    rating: 4.7
  },
  {
    id: "4",
    name: "Aloe Vera",
    price: 200,
    description: "Best for skin and home decoration. The gel inside has numerous medicinal properties.",
    image: "https://images.unsplash.com/photo-1596738317850-6a8690ec7d6f?q=80&w=500&auto=format&fit=crop",
    category: "Succulent",
    inStock: true,
    rating: 4.9
  },
  {
    id: "5",
    name: "Tomato Plant",
    price: 180,
    description: "Grow tomatoes easily at home. Perfect for balcony gardens and yields delicious fruits.",
    image: "https://images.unsplash.com/photo-1592841200221-a6c8c8f200e6?q=80&w=500&auto=format&fit=crop",
    category: "Vegetable",
    inStock: true,
    rating: 4.6
  },
  {
    id: "6",
    name: "Coriander (Dhaniya)",
    price: 90,
    description: "Fresh coriander leaves for garnishing. A staple herb in Indian cuisine.",
    image: "https://images.unsplash.com/photo-1527602695111-8c07bfc96f4c?q=80&w=500&auto=format&fit=crop",
    category: "Herb",
    inStock: true,
    rating: 4.4
  }
];
