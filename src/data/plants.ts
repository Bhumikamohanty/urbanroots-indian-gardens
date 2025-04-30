
export interface Plant {
  id: string;
  name: string;
  type: string;
  image: string;
  waterFrequency: string;
  sunlight: string;
  dateAdded: string;
  reminders?: PlantReminder[];
}

export interface PlantReminder {
  id: string;
  type: string;
  nextDue: string;
  completed: boolean;
}

// Sample plants data for demo
export const samplePlants: Plant[] = [
  {
    id: "1",
    name: "Tulsi (Holy Basil)",
    type: "Herb",
    image: "https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/holy-basil-herb1-1667586689480.jpg?v=1667586690",
    waterFrequency: "Every 2-3 days",
    sunlight: "Full Sun",
    dateAdded: "2023-04-15"
  },
  {
    id: "2",
    name: "Aloe Vera",
    type: "Succulent",
    image: "https://plantlife.ie/wp-content/uploads/2022/10/alar1535__000000.jpg",
    waterFrequency: "Every 2 weeks",
    sunlight: "Partial Sun",
    dateAdded: "2023-03-22"
  },
  {
    id: "3",
    name: "Mint (Pudina)",
    type: "Herb",
    image: "https://5.imimg.com/data5/SELLER/Default/2020/8/XQ/ED/UW/106270270/mint-pudina-.jpg",
    waterFrequency: "Every 1-2 days",
    sunlight: "Partial to Full Sun",
    dateAdded: "2023-05-10"
  },
  {
    id: "4",
    name: "Coriander",
    type: "Herb",
    image: "https://images.unsplash.com/photo-1617922631378-5ec3caa1abba?q=80&w=500&auto=format&fit=crop",
    waterFrequency: "Every 1-2 days",
    sunlight: "Partial Sun",
    dateAdded: "2023-06-05"
  },
  {
    id: "5",
    name: "Snake Plant",
    type: "Indoor Plant",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=500&auto=format&fit=crop",
    waterFrequency: "Every 2-3 weeks",
    sunlight: "Low to Medium Light",
    dateAdded: "2023-02-15"
  },
  {
    id: "6",
    name: "Curry Leaves",
    type: "Herb",
    image: "https://www.teojooguan.com/wp-content/uploads/2020/09/Curry-Leaves-Plant.jpeg",
    waterFrequency: "Every 3-4 days",
    sunlight: "Full Sun",
    dateAdded: "2023-03-10"
  }
];
