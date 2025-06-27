import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorder", {}, {
        headers: { token }
      });
      setData(response.data.data || []); // Assuming data is nested under 'data' key
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const containerStyle = {
    padding: '20px',
  };

  const titleStyle = {
    marginBottom: '20px',
  };

  const orderStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  };

  const imageStyle = {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };

  const itemListStyle = {
    margin: '0 10px',
    flex: '1',
  };

  const amountStyle = {
    margin: '0 10px',
    minWidth: '60px',
  };

  const countStyle = {
    margin: '0 10px',
    minWidth: '60px',
  };

  const statusStyle = {
    margin: '0 10px',
    color: 'red',
    minWidth: '100px',
  };

  const buttonStyle = {
    backgroundColor: '#ffe0e0',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: 'auto',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>My Orders</h2>
      <div>
        {data.map((order, index) => {
          const totalAmount = order.amount || 0;
          const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
          const itemsList = order.items
            .map((item, itemIndex) =>
              itemIndex === order.items.length - 1
                ? `${item.name} x ${item.quantity}`
                : `${item.name} x ${item.quantity}, `
            )
            .join('');

          return (
            <div key={index} style={orderStyle}>
              <img src={assets.parcel_icon} alt="" style={imageStyle} /> {/* Adjust path as needed */}
              <p style={itemListStyle}>{itemsList}</p>
              <p style={amountStyle}>${totalAmount.toFixed(2)}</p>
              <p style={countStyle}>Items: {itemCount}</p>
              <p style={statusStyle}>• Food Processing</p>
              <button style={buttonStyle}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;