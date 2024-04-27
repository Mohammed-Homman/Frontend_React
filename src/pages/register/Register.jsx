import React, { useState ,useEffect} from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newResquest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Password: "",
    ProfilePicture: "",
    Country: "",
    Phone:"",
    IsSeller: false,
    Desc: "",
  });

  const navigate = useNavigate();

  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      
      navigate("/"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, IsSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
  
    const formData = new FormData();
    formData.append("username", user.Username);
    formData.append("email", user.Email);
    formData.append("passwordHash", user.Password);
    formData.append("profilePicture", url);
    formData.append("country", user.Country);
    formData.append("phone", user.Phone);
    formData.append("desc", user.Desc);
    formData.append("isSeller", user.IsSeller);
  
    try {
      await newResquest.post("/api/User/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      navigate("/login");
      console.log("added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="Username"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="Email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="Password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" name="ProfilePicture" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="Country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input name="IsSeller" type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="Phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="Desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;