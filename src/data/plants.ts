
export interface Plant {
  id: string;
  name: string;
  type: string;
  image: string;
  waterFrequency: string;
  sunlight: string;
  dateAdded: string;
}

// Sample plants data for demo
export const samplePlants: Plant[] = [
  {
    id: "1",
    name: "Tulsi (Holy Basil)",
    type: "Herb",
    image: "https://images.unsplash.com/photo-1596634608283-8c6ab1a0a1ae?q=80&w=500&auto=format&fit=crop",
    waterFrequency: "Every 2-3 days",
    sunlight: "Full Sun",
    dateAdded: "2023-04-15"
  },
  {
    id: "2",
    name: "Aloe Vera",
    type: "Succulent",
    image: "https://images.unsplash.com/photo-1596738317850-6a8690ec7d6f?q=80&w=500&auto=format&fit=crop",
    waterFrequency: "Every 2 weeks",
    sunlight: "Partial Sun",
    dateAdded: "2023-03-22"
  },
  {
    id: "3",
    name: "Mint (Pudina)",
    type: "Herb",
    image: "https://images.unsplash.com/photo-1563804447974-0e7163fb74aa?q=80&w=500&auto=format&fit=crop",
    waterFrequency: "Every 1-2 days",
    sunlight: "Partial to Full Sun",
    dateAdded: "2023-05-10"
  }
];
