export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  addToCart?: boolean;
  badge?: string;
  colors?: string[];
};
