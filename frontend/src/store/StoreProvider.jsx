import React, { useCallback, useEffect, useState } from 'react';
import StoreContext from './StoreContext';
import axios from 'axios'

const StoreProvider = ({children}) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:5000";
    const [token,setToken] = useState(localStorage.getItem("token"));

    const [food_list,setFood_list] = useState([]);

    const addToCart=async(itemId)=>{
      if(!cartItems[itemId])
      setCartItems((prev)=>({...prev,[itemId]:1}));
      else
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));

      if(token)
      {
        const resp = await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        await fetchCart();
      }
    }

    const removeFromCart = async(itemId)=>{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
      if(token)
        {
          const resp = await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
          await fetchCart();
        }
    }
    
    const fetchCart = useCallback(async()=>{
      const resp = await axios.get(url+"/api/cart/get",{headers:{token}});
      setCartItems(resp.data.cartData);
    },[])

    const getTotalCartAmount=()=>{
      let totalAmount = 0;
      for(const item in cartItems)
      {
        if(cartItems[item]>0)
        {
          let itemInfo = food_list.find((product)=> product._id === item)
          totalAmount+= itemInfo.price*cartItems[item];  
        }        
      }
      return totalAmount;
    }

    const getFoodList = async()=>{
      
      try {
        const list = await axios.get(`${url}/api/food/get`);
        setFood_list(list.data.data);  
      } catch (error) {
        console.log(error);
      }
    }
    

    useEffect(() => {
      getFoodList();
    }, []);

    useEffect(()=>{
      fetchCart();
    },[fetchCart])
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
