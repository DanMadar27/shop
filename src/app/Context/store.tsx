
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

import Product from '../../models/Product';

interface ContextProps {
    products: Product[],
    setProduct: (product: Product) => void;
    setProducts: Dispatch<SetStateAction<Product[]>>
}

const GlobalContext = createContext<ContextProps>({
    products: [],
    setProduct: (product: Product): void => {},
    setProducts: (): Product[] => [] 
})

export const GlobalContextProvider = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const setProduct = (product: Product) => {
        const newProducts = products.map((p) => {
            return p.id === product.id ? product : p;
        });

        setProducts(newProducts);
    }

    return (
        <GlobalContext.Provider
          value={{
            products,
            setProduct,
            setProducts,
          }}
        >
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);