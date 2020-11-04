import React, { useEffect, useState } from "react";

const usePersistedState = (defaultValue, name) => {
  const persistedValue = JSON.parse(localStorage.getItem(name));
  //check if value in local storage under name and return it if not give it default value
  const [value, setValue] = useState(() => {
    return persistedValue ? persistedValue : defaultValue;
  });
  //saves value in local storage when used
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);
  return [value, setValue];
};

export default usePersistedState;
