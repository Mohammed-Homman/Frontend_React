// Gig.jsx
import React, { useState, useEffect } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";


function Gig() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [updatedPrice, setUpdatedPrice] = useState(0);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gigResponse = await newRequest.get(`api/Product/single/${id}`);
        setData(gigResponse.data);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong!");
        setLoading(false);
      }

      if (data.userId) {
        try {
          const userResponse = await newRequest.get(`api/User/${data.userId}`);
          setDataUser(userResponse.data);
          setLoadingUser(false);
        } catch (error) {
          setErrorUser("Something went wrong!");
          setLoadingUser(false);
        }
      }
    };

    fetchData();
  }, [id, data.userId]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    // Add logic to update the price based on the selected quantity
    const updatedPrice = data.price * newQuantity;
    setUpdatedPrice(updatedPrice);
  };
  const handleAddToCart = () => {
    // Add logic to store the order details and navigate to the order page
    const orderDetails = {
      uderID : data.userId,
      productCover: data.cover,
      productId: data.id,
      productName: data.title,
      quantity: quantity,
      totalPrice: updatedPrice,
      deliveryTime: data.deliveryTime,
    };
  
    // Add logic to append orderDetails to the existing list in a state, context, or any other storage mechanism
    // For now, let's use local storage as an example
    const existingOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  
    // Check if existingOrderDetails is an array
    const updatedOrderDetails = Array.isArray(existingOrderDetails)
      ? [...existingOrderDetails, orderDetails]
      : [orderDetails];
      console.log(updatedOrderDetails);
  
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
  
    navigate("/order");
  };
  
  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.profilePicture || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.userName}</span>
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.length > 0 ? (
                data.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    style={{ height: "400px", width: "350px" }}
                  />
                ))
              ) : (
                <p style={{ color: "red", background: "transparent" }}>
                  No images for this product
                </p>
              )}
            </Slider>
            <h2 style={{ color: "white" }}>A propos de cet article </h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2 style={{ color: "white" }}>A propos du vendeur</h2>
                <div className="user">
                  <img
                    src={dataUser.profilePicture || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <div className="info">
                    <span>{dataUser.userName}</span>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/messages")}
                    >
                      Contactez-moi
                    </button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item" style={{ color: "white" }}>
                      <span className="title">Pays</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item" style={{ color: "white" }}>
                      <span className="title">Phone</span>
                      <span className="desc">{dataUser.phone}</span>
                    </div>
                    <div className="item" style={{ color: "white" }}>
                      <span className="title">Email</span>
                      <span className="desc">{dataUser.email}</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <div className="price">
              <h2>$ {updatedPrice > 0 ? updatedPrice : data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} jours pour la livraison</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="quantity-section">
              <label>Quantité:</label>
              <input style={{borderRadius:"20px",marginLeft:"50px",height:"25px",padding:"10px"}}
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </div>
            <button onClick={handleAddToCart} disabled={quantity <= 0}>
              Ajouter{" "}
              <img
                style={{ color: "black" }}
                src="/img/panier.png"
                alt=""
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
