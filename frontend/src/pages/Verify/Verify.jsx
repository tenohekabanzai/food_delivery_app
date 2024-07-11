import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StoreContext from '../../store/StoreContext';
import axios from 'axios';

const Verify = () => {
    
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url} = useContext(StoreContext)

    const verifyPayment = async()=>{
        const resp = await axios.post(url+"/api/order/verify",{success,orderId});
        if(resp.data.success)
        navigate("/myorders");
        else
        navigate("/");
    }

    useEffect(() => {
      verifyPayment();
    }, []);

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  );
}

export default Verify;
