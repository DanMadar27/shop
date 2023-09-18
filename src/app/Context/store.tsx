
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

import Product from '../../models/Product';

interface ContextProps {
}

const GlobalContext = createContext<ContextProps>({
})

export const GlobalContextProvider = ({ children }: { children: any }) => {
    return (
        <GlobalContext.Provider
          value={{
          }}
        >
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);