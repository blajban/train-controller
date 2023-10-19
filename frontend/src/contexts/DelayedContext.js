import React, { useContext } from 'react';

const DelayedContext = React.createContext();

export const useDelayed = () => {
    return useContext(DelayedContext);
  };

export default DelayedContext;
