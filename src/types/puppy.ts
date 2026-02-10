export interface Puppy {
  id: string;
  name: string;
  breed: string;
  breedId: string;
  age: number;
  gender: "Male" | "Female";
  price: number;
  location: string;
  images: string[];
  description: string;
  breeder: {
    id: string;
    name: string;
    location: string;
    rating: number;
    phone?: string;
    email?: string;
    yearsExperience?: number;
    totalPuppies?: number;
  };
  available: boolean;
  weight: number;
  color: string;
  vaccinations: string[];
  healthGuarantee: boolean;
  microchipped: boolean;
  dateAdded: string;
  puppyId?: string; // Reference number like 812723
}

export interface Breed {
  id: string;
  name: string;
  description: string;
  image: string;
  size: "Small" | "Medium" | "Large" | "Extra Large";
  temperament: string[];
  lifeSpan: string;
  exerciseNeeds: string;
  groomingNeeds: string;
}

export interface FilterOptions {
  breed?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  gender?: "Male" | "Female";
  age?: string;
  size?: string;
}
