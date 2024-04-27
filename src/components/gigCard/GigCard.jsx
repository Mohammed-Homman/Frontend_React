import React, { useState, useEffect } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await newRequest.get(`api/User/${item.userId}`);
        setUserData(userResponse.data);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong!");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [item.userId]);
  return (
    <Link to={`/gig/${item.productId}`} className="link">
      <div className="gigCard">
        <img src={item.images} alt="" />
        <div className="info">
          {loading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={userData.profilePicture || "/img/noavatar.jpg"} alt="" />
              <span style={{color:"black"}}>{userData.userName}</span>
            </div>
          )}
          <p>{item.desc.substring(0, 50)}...</p>
          {/* Other content */}
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default GigCard;
