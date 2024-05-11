import { createContext, useContext, useState } from "react";
import cartProductData from "../cartProduct.json"

const CartContext = createContext();


export const CartContextProvider = ({ children }) => {

    const [products, setProducts] = useState(cartProductData.products)

    return (
        <CartContext.Provider value={{ products, setProducts }}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)