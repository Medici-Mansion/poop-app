import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext({
  action: '',
  setAction: (action: string) => {},
});

/**
 * ViewContextProvider
 * @description view 영역의 액션을 관리하는 provider (ex. header)
 */
export const ViewContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [action, setAction] = useState('');

  return (
    <MyContext.Provider value={{ action, setAction }}>
      {children}
    </MyContext.Provider>
  );
};

export const useViewContext = () => useContext(MyContext);