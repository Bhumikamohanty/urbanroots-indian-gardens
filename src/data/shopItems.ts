
export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subCategory?: string;
  inStock: boolean;
  rating: number;
}

export const shopCategories = [
  "Plant",
  "Tool",
  "Soil",
  "Pot",
  "Kit",
  "Fertilizer",
  "Pesticide"
];

export const shopItems: ShopItem[] = [
  // Plants
  {
    id: "1",
    name: "Tulsi (Holy Basil)",
    price: 120,
    description: "Sacred plant for Indian households. Medicinal properties and religious significance.",
    image: "https://images.unsplash.com/photo-1596634608283-8c6ab1a0a1ae?q=80&w=500&auto=format&fit=crop",
    category: "Plant",
    subCategory: "Herb",
    inStock: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Mint (Pudina)",
    price: 100,
    description: "Fresh mint leaves for cooking. Adds amazing flavor to chutney, raita, and chai.",
    image: "https://images.unsplash.com/photo-1563804447974-0e7163fb74aa?q=80&w=500&auto=format&fit=crop",
    category: "Plant",
    subCategory: "Herb",
    inStock: true,
    rating: 4.5
  },
  {
    id: "3",
    name: "Curry Leaves (Kadi Patta)",
    price: 150,
    description: "Essential for Indian tadka. The aromatic leaves add authentic flavor to south Indian dishes.",
    image: "https://images.unsplash.com/photo-1589918239875-dabb266c523c?q=80&w=500&auto=format&fit=crop",
    category: "Plant",
    subCategory: "Herb",
    inStock: true,
    rating: 4.7
  },
  {
    id: "4",
    name: "Aloe Vera",
    price: 200,
    description: "Best for skin and home decoration. The gel inside has numerous medicinal properties.",
    image: "https://images.unsplash.com/photo-1596738317850-6a8690ec7d6f?q=80&w=500&auto=format&fit=crop",
    category: "Plant",
    subCategory: "Medicinal",
    inStock: true,
    rating: 4.9
  },
  {
    id: "5",
    name: "Tomato Plant",
    price: 180,
    description: "Grow tomatoes easily at home. Perfect for balcony gardens and yields delicious fruits.",
    image: "https://images.unsplash.com/photo-1592841200221-a6c8c8f200e6?q=80&w=500&auto=format&fit=crop",
    category: "Plant",
    subCategory: "Vegetable",
    inStock: true,
    rating: 4.6
  },
  {
    id: "6",
    name: "Coriander (Dhaniya)",
    price: 90,
    description: "Fresh coriander leaves for garnishing. A staple herb in Indian cuisine.",
    image: "https://images.unsplash.com/photo-1527602695111-8c07bfc96f4c?q=80&w=500&auto=format&fit=crop",
    category: "Plant",
    subCategory: "Herb",
    inStock: true,
    rating: 4.4
  },
  // Tools
  {
    id: "7",
    name: "Hand Trowel",
    price: 250,
    description: "Perfect for small planting jobs in containers and garden beds. Ideal for balcony gardening.",
    image: "https://images.unsplash.com/photo-1617692855273-2f6b7a874b1d?q=80&w=500&auto=format&fit=crop",
    category: "Tool",
    inStock: true,
    rating: 4.7
  },
  {
    id: "8",
    name: "Garden Gloves",
    price: 199,
    description: "Comfortable and durable gloves for protecting your hands while gardening.",
    image: "https://images.unsplash.com/photo-1620234226594-46f09f190bc9?q=80&w=500&auto=format&fit=crop",
    category: "Tool",
    inStock: true,
    rating: 4.3
  },
  {
    id: "9",
    name: "Garden Scissors",
    price: 350,
    description: "Precise cutting for harvesting herbs and trimming plants. Essential for every gardener.",
    image: "https://images.unsplash.com/photo-1593025581460-5c52a72894a5?q=80&w=500&auto=format&fit=crop",
    category: "Tool",
    inStock: true,
    rating: 4.8
  },
  // Soil & Fertilizers
  {
    id: "10",
    name: "Cocopeat Block",
    price: 149,
    description: "Eco-friendly growing medium that retains water and nutrients. Expands to 7-8 times when wet.",
    image: "https://images.unsplash.com/photo-1598900438157-e450a5dfda0d?q=80&w=500&auto=format&fit=crop",
    category: "Soil",
    inStock: true,
    rating: 4.6
  },
  {
    id: "11",
    name: "Organic Compost",
    price: 299,
    description: "Nutrient-rich organic compost for healthy plant growth. Made from plant waste and cow dung.",
    image: "https://images.unsplash.com/photo-1598900438053-9e8f17c243ce?q=80&w=500&auto=format&fit=crop",
    category: "Soil",
    inStock: true,
    rating: 4.9
  },
  {
    id: "12",
    name: "Organic Neem Oil Spray",
    price: 199,
    description: "Natural pest control solution that's safe for edible plants. Controls insects and fungal diseases.",
    image: "https://images.unsplash.com/photo-1593883698744-5f4536439ed5?q=80&w=500&auto=format&fit=crop",
    category: "Pesticide",
    inStock: true,
    rating: 4.7
  },
  // Pots
  {
    id: "13",
    name: "Terracotta Pots (Set of 3)",
    price: 499,
    description: "Breathable clay pots in graduated sizes, perfect for herbs. Traditional look for Indian balconies.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=500&auto=format&fit=crop",
    category: "Pot",
    inStock: true,
    rating: 4.5
  },
  {
    id: "14",
    name: "Hanging Planters (Set of 2)",
    price: 599,
    description: "Space-saving solution for balconies. Beautiful macramé hanging planters for trailing plants.",
    image: "https://images.unsplash.com/photo-1611022418330-ffb0898dc8a7?q=80&w=500&auto=format&fit=crop",
    category: "Pot",
    inStock: true,
    rating: 4.8
  },
  // Kits
  {
    id: "15",
    name: "Balcony Herb Garden Starter Kit",
    price: 1299,
    description: "Everything you need to start your balcony herb garden: 5 herb seeds, 3 pots, organic soil, tools, and guide.",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=500&auto=format&fit=crop",
    category: "Kit",
    inStock: true,
    rating: 4.9
  },
  {
    id: "16",
    name: "Kitchen Garden Beginner Kit",
    price: 999,
    description: "Start growing your own food with seeds for coriander, mint, chili, and tomato, plus soil and containers.",
    image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?q=80&w=500&auto=format&fit=crop",
    category: "Kit",
    inStock: true,
    rating: 4.7
  }
];
