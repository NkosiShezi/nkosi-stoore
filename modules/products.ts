export interface Products {
  id?: number;
  price: number;
  rating?: Rating;
  category?: string;
  description: string;
  image: string;
  title: string;
  isProductPage?: boolean;
}

interface Rating {
  rate: number;
  count: number;
}
