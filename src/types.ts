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

export type Token = string; // token comes from the api as a string

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export type CartActions = // we make a type for the actions here to specify the valid actions and to specify the data that each action need to wrork
  | { type: "ADD_ITEM"; payload: CartProduct } // | = or , type (the name of the action) payload(the type of the data that the action will take)
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QTY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

export interface FavoriteProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export type FavoriteActions =
  | { type: "TOGGLE_FAVOURITE"; payload: FavoriteProduct }
  | { type: "CLEAR_FAVOURITES" };
