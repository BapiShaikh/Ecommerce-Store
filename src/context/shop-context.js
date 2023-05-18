import React,{ createContext,useState} from 'react'
import { PRODUCTS } from '../product';
import Product from '../pages/shop/product';

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {}
    for(let i=1;i<PRODUCTS.length +1; i++){
        cart[i] = 0;
    }
    return cart
}

const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                const iteminfo = PRODUCTS.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * iteminfo.price;
            }
        }
        return totalAmount;
    }


    const addToCart = (itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]: prev[itemId]+1}));
        
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]: prev[itemId]-1}));
        
    }
    const updateCartItemCount = (newAmount,itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:newAmount}))
    }

    const contextValue = {cartItems,addToCart, removeFromCart,updateCartItemCount,getTotalCartAmount,}
    console.log(cartItems)
   
  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
 
}

export default ShopContextProvider