import React, { useCallback, useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import StoreContext from '../../store/StoreContext';
import {assets} from '../../assets/frontend_assets/assets';
import axios from 'axios';

const MyOrders = () => {
  
    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);

    const fetchOrders = useCallback(async()=>{
        const resp = await axios.post("http://localhost:5000/api/order/userorders",{},{headers:{token}});        
        setData(resp.data.data);
    },[]);

   

    useEffect(() => {
      if(token)
      fetchOrders()
    }, [fetchOrders]);
  
    return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return (
                <div className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                     <p>{order.items.map((item,index)=>{
                        if(index === order.items.length-1)
                        {
                            return item.name+" x "+item.quantity;
                        }
                        else
                        {
                            return item.name+" x "+item.quantity+", ";
                        }
                     })}</p>
                     <p>${order.amount}.00</p>
                     <p>Items: {order.items.length}</p>
                     <p><span>&#x25cf;<b>{order.status}</b></span></p>
                </div>
            )
        })}
      </div>
    </div>
  );
}

export default MyOrders;
