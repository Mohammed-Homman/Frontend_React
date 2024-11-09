import React from "react";
import "./Payment.css";
import { useLocation } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || [];

  // Calculate the total price
  const totalPrice = orderDetails.reduce((total, product) => total + product.totalPrice, 0);

  return (
    <div>
      <div className="container">
      <form action="">
          <div className="row">
            <div className="col">
              <div className="row">
              <h3 style={{ marginBottom: "-60px" }} className="title">
  Prix Total :<span style={{ color: "green" }}> ${totalPrice}</span>
</h3>
          {orderDetails.length > 0 ? (
          <table className="order-table">
          <thead>
            <tr>
              <th style={{ paddingRight: "10px" }}>Product </th>
              <th style={{ paddingRight: "10px" }}>Quantity</th>
              <th style={{ paddingRight: "10px" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((product, index) => (
              <tr key={index}>
                <td style={{ paddingLeft: "10px" }}>{product.productName}</td>
                <td style={{ paddingLeft: "30px" }}>{product.quantity}</td>
                <td style={{ paddingLeft: "10px" }}>${product.totalPrice}</td>
                
              </tr>
            ))}
          </tbody>
        </table>) : (
          <p>No products in the order</p>
        )}          
              </div>
              <div className="col">
              <h3 className="title" style={{marginTop:"20px"}}>Payment</h3></div>
              <div className="inputBox">
                <span>Full Name :</span>
                <input type="text" placeholder="Mohammed Homman" />
              </div>
              <div className="inputBox">
                <span>Email :</span>
                <input type="email" placeholder="mohammedhomman17@gmail.com" />
              </div>
              <div className="inputBox">
                <span>Address :</span>
                <input type="text" placeholder="Full Address" />
              </div>
              <div className="inputBox">
                <span>City :</span>
                <input type="text" placeholder="Fez" />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <span>State :</span>
                  <input type="text" placeholder="Morocco" />
                </div>
                <div className="inputBox">
                  <span>Zip Code :</span>
                  <input type="text" placeholder="30000" />
                </div>
              </div>
            </div>
            <div className="col">

              <div className="inputBox">
                <span>Cards Accepted :</span>
                <img src="./img/card_img.png" alt="" />
              </div>
              <div className="inputBox">
                <span>Name on Card :</span>
                <input type="text" placeholder="mr. HOMMAN MOHAMED" />
              </div>
              <div className="inputBox">
                <span>Credit Card Number :</span>
                <input type="number" placeholder="3245-1983-3234-4324" />
              </div>
              <div className="inputBox">
                <span>Exp Month :</span>
                <input type="text" placeholder="January" />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <span>Exp Year :</span>
                  <input type="number" placeholder="2023" />
                </div>
                <div className="inputBox">
                  <span>CVV :</span>
                  <input type="text" placeholder="1234" />
                  

                </div>
                

              </div>
              <hr style={{ margin: "20px 0" }} />
              <button style={{color:"white",background:"green",padding:"5px 10px",borderRadius:"10px",width:"auto",marginTop:"20px"}}  >Confirmer</button>
              <button style={{color:"white",background:"red",padding:"5px 10px",borderRadius:"10px",marginLeft:"5px",width:"auto",marginTop:"20px"}}  >Annuler</button>

            </div>
          </div>
        </form>

        </div>
        </div>
  );
}

export default Payment;
