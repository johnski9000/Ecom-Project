export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  amount?: number;
}
export interface BasketState {
  basket: Product[];
}

// Define the type for the props expected by the ItemCard component
export interface ItemCardProps {
  product: Product;
}

export interface State {
  basket: Product[];
  user: any;
}

export interface RouterProps {
  navigation: object;
}
export interface User {
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
}
