export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number; // average rating of the product
    count: number; // number of persons who viewd the product
  };
}

export type Category = string[];

export type CartItem = {
  product: Product;
  quantity: number;
};
