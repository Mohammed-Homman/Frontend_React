import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./Navbar.scss";

import newResquest from "../../utils/newRequest";
import {useNavigate} from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate(); 
  const handleLogout= async() => {
    try {
      await newResquest.post("api/User/logout");
      localStorage.removeItem("currentUser")
      navigate("/");

    }catch(err){
      console.log(err);
    }
  };
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Manzo</span>
          </Link>
          <span className="dot">.</span>
        </div>
        
        <div className="links">
          
          <Link className="link" to='/Explore'>
            <span className="text" id="explore">Explore Market</span>
          </Link>
          
          
          <span>English</span>
          {/* !currentUser?.isSeller && <span>Become a Seller</span> */}
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <p style={{background:"white",color:"black",padding:"4px 10px",borderRadius:"10px"}}>{currentUser.userName}</p>
              
              
              {open && <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Mes Produits
                    </Link>
                    <Link className="link" to="/add">
                      Ajouter un Produit
                    </Link>
                  </>
                )}
                <Link className="link" to="/Explore">
                  Produits
                </Link>
                <Link className="link" to="/order">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" style={{color:"red"}} onClick={handleLogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link to="/login" className="link" >Sign in</Link>
              <Link to="/register" className="link" >
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}
export default Navbar;
