import React, { createContext, useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import items from "../data";

export const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "purchased-items"
  );

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
