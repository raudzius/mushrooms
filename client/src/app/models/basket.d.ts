type BasketItem = {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  type: string;
  category: string;
  quantity: number;
};

type Basket = {
  id: number;
  buyerId: string;
  items: BasketItem[];
};
