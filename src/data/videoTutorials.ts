
export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  duration: string;
}

export const videoTutorials: VideoTutorial[] = [
  {
    id: "1",
    title: "How to Grow Mint at Home",
    description: "Easy step-by-step guide to grow pudina (mint) in your balcony garden using simple containers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1563804447974-0e7163fb74aa?q=80&w=500&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    category: "Herbs",
    duration: "8:25"
  },
  {
    id: "2",
    title: "Balcony Gardening Tips for Indian Homes",
    description: "Learn how to utilize limited balcony space for growing multiple plants in Indian weather conditions.",
    thumbnailUrl: "https://images.unsplash.com/photo-1598880940371-c756e015fea2?q=80&w=500&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    category: "Gardening Tips",
    duration: "12:40"
  },
  {
    id: "3",
    title: "Growing Tulsi: The Holy Basil",
    description: "Complete guide on growing and caring for Tulsi plants. Learn about its religious and medicinal importance.",
    thumbnailUrl: "https://images.unsplash.com/photo-1596634608283-8c6ab1a0a1ae?q=80&w=500&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    category: "Herbs",
    duration: "10:15"
  },
  {
    id: "4",
    title: "Kitchen Garden: Growing Vegetables at Home",
    description: "Learn to grow tomatoes, chillies, and other vegetables in small spaces. Perfect for Indian apartments.",
    thumbnailUrl: "https://images.unsplash.com/photo-1592841200221-a6c8c8f200e6?q=80&w=500&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example4",
    category: "Vegetables",
    duration: "15:30"
  },
  {
    id: "5",
    title: "Monsoon Care for Your Plants",
    description: "Special care tips for your balcony plants during the Indian monsoon season to prevent disease and damage.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516168399579-da57f8d66bf7?q=80&w=500&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example5",
    category: "Seasonal Care",
    duration: "9:45"
  },
  {
    id: "6",
    title: "Organic Pest Control for Home Gardens",
    description: "Natural and chemical-free methods to control common pests in your Indian home garden.",
    thumbnailUrl: "https://images.unsplash.com/photo-1592463773000-c8024c9a239f?q=80&w=500&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example6",
    category: "Plant Care",
    duration: "11:20"
  }
];
