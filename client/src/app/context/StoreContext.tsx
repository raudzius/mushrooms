import React, {
  ReactNode, createContext, useContext, useState,
} from 'react';

type StoreContextValue = {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
};

export const StoreContext = createContext<StoreContextValue | null>(null);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw Error('Oops we do not seem to be inside the provider');
  }

  return context;
};

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return;

    const basketItems = [...basket.items];
    const basketItemIndex = basketItems
      .findIndex((basketItem) => basketItem.productId === productId);

    if (basketItemIndex >= 0) {
      const foundBasketItem = basketItems[basketItemIndex];
      foundBasketItem.quantity -= quantity;

      if (foundBasketItem.quantity === 0) {
        basketItems.splice(basketItemIndex, 1);
        setBasket((prevState) => ({ ...prevState!, items: basketItems }));
      }
    }
  };

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
};
