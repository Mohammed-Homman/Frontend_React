import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderCard from "../../components/orderCard/orderCard";

function Order() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order details from storage or API based on your implementation
    const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));

    // If stored order details are found, set them in the state
    if (storedOrderDetails) {
      setOrderDetails(storedOrderDetails);
    } else {
      // Redirect to Explore page if no order details are found
      navigate("/explore");
    }
  }, [id, navigate]);

  const handleRemoveProduct = (index) => {
    // Add logic to remove the product from the order details list
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails.splice(index, 1);
    setOrderDetails(updatedOrderDetails);

    // Update the order details in storage
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
  };

  const handleProceedToPayment = () => {
    // Navigate to the payment page, passing order details as a query parameter
    navigate("/payment", { state: { orderDetails } });
  };

  return (
    <div className="order">
      <div className="container" style={{padding:"2rem 3rem" }}>
        <h1 style={{color:"black"}}>Order Details</h1>
        <div style={{ display: "flex", flexDirection: "row",flexWrap:"wrap",justifyContent:"space-round" }}>
        {orderDetails.length > 0 ? (
          orderDetails.map((product, index) => (
            <OrderCard key={index} product={product} onRemoveProduct={handleRemoveProduct} />
          ))
        ) : (
          <p>No products in the order</p>
        )}
    </div>
   
          <button onClick={handleProceedToPayment} style={{background:"black",color:"white",width:"100%",borderRadius:"20px",justifyContent:"center",alignContent:"center",alignItems:"center"}}>Payment</button>
    
       
      </div>
      
    </div>
  );
}

export default Order;
