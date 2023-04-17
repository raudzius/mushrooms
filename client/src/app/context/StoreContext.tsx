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

    const items = [...basket.items];
    const itemIndex = items.findIndex((item) => item.productId === productId);

    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;

      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);

      setBasket((prevState) => ({ ...prevState!, items }));
    }
  };

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
};
