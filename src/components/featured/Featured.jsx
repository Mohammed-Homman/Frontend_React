import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";
import { images } from "../../Constants";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser?.userId);
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
          <span>Find the perfect</span>  product  <span>or</span>  service
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Search for a product ...'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Electronique</button>
            <button>Immobilier</button>
            <button>Vetement</button>
            <button>Chaussure</button>
          </div>
        </div>
        <div className="right">
          <img src={images.logo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;