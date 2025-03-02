export interface FoodItem {
    id: number;
    name: string;
    restaurant: string;
    rating: string;
    distance: string;
    price: string;
    imgUrl: string;
  }
  
  
  export interface FoodCardProps {
    food: FoodItem;
  }
  
  export interface Coords {
    lat: number | null;
    lng: number | null;
  }

  export interface VoiceSearchSectionProps {
    onCommand: (transcript: string) => void;
}