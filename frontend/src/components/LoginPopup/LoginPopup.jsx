import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import StoreContext from "../../store/StoreContext";
import axios from 'axios';
const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Sign Up");

    const [data,setData] = useState({
      name:"",
      email:"",
      password:"",
    });

    const onChangeHandler=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const handleSubmit=async(e)=>{

      e.preventDefault();
      let newUrl = url
      
      if(currState === "Sign Up")
      newUrl += '/api/user/register';
      else
      newUrl += '/api/user/login';

      try {
          const response = await axios.post(newUrl,data);
          if(response.data.success)
          {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
          }
          else{
            alert(response.data.message);
          }
      } catch (error) {
        console.log(error);
      }

    }


  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(0)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==='Login'? <></>:
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} 
            placeholder="Your Name" required/>}
            <input type="email" name="email" onChange={onChangeHandler} value={data.email} 
            placeholder="Your Email" required/>
            <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" required/>
        </div>
        <button type="submit">{currState==="Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terns of use & privacy policy</p>
        </div>
        {currState === 'Login' ? 
        <p>Create a New Account ? <span onClick={()=>setCurrState('Sign Up')}>Click Here</span>  </p> :
        <p>Already have an account ? <span onClick={()=>setCurrState('Login')}>Login here</span></p>}
      </form>
    </div>
  );
};

export default LoginPopup;
