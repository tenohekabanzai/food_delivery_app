import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import StoreContext from "../../store/StoreContext";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };


  const placeOrder = async(e)=>{
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address:data,
      items: orderItems,
      amount: getTotalCartAmount()+2      
    }
    let resp = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    if(resp.data.success)
    {
      const {session_url} = resp.data;
      window.location.replace(session_url);
    }
    else
    {
      alert("Error");
    }

  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token)
      navigate('/');
    else if(getTotalCartAmount() === 0)
      navigate('/cart');
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input required
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            type="text"
            placeholder="First Name"
          />
          <input required
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email"
        />
        <input required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input required type="text" placeholder="City" />
          <input required type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zipcode"
          />
          <input required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</b>
            </div>
          </div>
          <button type="submit">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
