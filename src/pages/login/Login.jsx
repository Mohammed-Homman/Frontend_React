import React, { useState,useEffect } from "react";
import "./Login.scss";
import newResquest from "../../utils/newRequest";
import {useNavigate} from "react-router-dom";
import {images} from "../../Constants"



function Login() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      
      navigate("/"); 
    }
  }, [navigate]);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", Email);
      formData.append("password", password);

      const res = await newResquest.post("api/User/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //setCurrentUser(localStorage.setItem("currentUser", JSON.stringify(res.data)));
      localStorage.setItem("currentUser", JSON.stringify(res.data));

    setCurrentUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="login">
      <div className="left">
        <img src={images.logo} className="logo"/>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>

       <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <p style={{color:"white"}}>Not registered yet</p>
        <button style={{background:"transparent",color:"white",fontStyle:"bold"}} onClick={()=>navigate("/register")}>Register here</button>
       </div>


        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
