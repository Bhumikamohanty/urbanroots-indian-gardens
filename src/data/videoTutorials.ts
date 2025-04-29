
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
    thumbnailUrl: "https://img.youtube.com/vi/131NMv3O3mk/hqdefault.jpg",
    videoUrl: "https://youtu.be/131NMv3O3mk?si=LjwJf4zmDBuEgDdt",
    category: "Herbs",
    duration: "8:25"
  },
  {
    id: "2",
    title: "Balcony Gardening Tips for Indian Homes",
    description: "Learn how to utilize limited balcony space for growing multiple plants in Indian weather conditions.",
    thumbnailUrl: "https://img.youtube.com/vi/Tmz8PPMF6dY/hqdefault.jpg",
    videoUrl: "https://youtu.be/Tmz8PPMF6dY?si=620kaA1A9Wcfd9eR",
    category: "Gardening Tips",
    duration: "12:40"
  },
  {
    id: "3",
    title: "Growing Tulsi: The Holy Basil",
    description: "Complete guide on growing and caring for Tulsi plants. Learn about its religious and medicinal importance.",
    thumbnailUrl: "https://img.youtube.com/vi/sUlkpDZAHFg/hqdefault.jpg",
    videoUrl: "https://youtu.be/sUlkpDZAHFg?si=T99wyWFzPRq4XP9s",
    category: "Herbs",
    duration: "10:15"
  },
  {
    id: "4",
    title: "Kitchen Garden: Growing Vegetables at Home",
    description: "Learn to grow tomatoes, chillies, and other vegetables in small spaces. Perfect for Indian apartments.",
    thumbnailUrl: "https://img.youtube.com/vi/kNAd4BZv7c0/hqdefault.jpg",
    videoUrl: "https://youtu.be/kNAd4BZv7c0?si=Pd9eUv9DgP8hgXCm",
    category: "Vegetables",
    duration: "15:30"
  },
  {
    id: "5",
    title: "Monsoon Care for Your Plants",
    description: "Special care tips for your balcony plants during the Indian monsoon season to prevent disease and damage.",
    thumbnailUrl: "https://img.youtube.com/vi/gBMFbxkqn_c/hqdefault.jpg",
    videoUrl: "https://youtu.be/gBMFbxkqn_c?si=nNoBrZ1dPIsdivJ0",
    category: "Seasonal Care",
    duration: "9:45"
  },
  {
    id: "6",
    title: "Organic Pest Control for Home Gardens",
    description: "Natural and chemical-free methods to control common pests in your Indian home garden.",
    thumbnailUrl: "https://img.youtube.com/vi/bWyB3gVirXQ/hqdefault.jpg",
    videoUrl: "https://youtu.be/bWyB3gVirXQ?si=R2Fzo-W450utlef5",
    category: "Plant Care",
    duration: "11:20"
  }
];
