import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/userorder");
    } else {
      navigate("/"); // Redirect to home or handle failure differently
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    }
  }, [success, orderId, url, navigate]);

  // Inline CSS styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  };

  const messageStyle = {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        {success === "true" ? "Verifying payment..." : "Payment verification failed, redirecting..."}
      </div>
    </div>
  );
};

export default Verify;