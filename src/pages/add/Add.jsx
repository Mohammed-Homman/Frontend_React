import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import newResquest from "../../utils/newRequest";
import { images } from "../../Constants";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(state);

  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await newResquest.post("api/Product/create", {user:JSON.parse(localStorage.getItem("currentUser")),...state});
//         console.log("Product added successfully");
//         navigate("/");
//     } catch (err) {
//         setError(err.response.data.message || "An error occurred");
//     }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const res = await newResquest.post("api/Product/create",state);
      console.log("Product added successfully");
      navigate("/mygigs");
  } catch (err) {
      setError(err.response.data.message || "An error occurred");
  }
};
  return (
    <div >
      {/*<img style={{position:"absolute",width:"100%"}} src={images.logo}/>*/}
    <div className="add">
      <div className="container">
        <h1>Ajouter un article</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Titre</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={handleChange} >
              <option style={{color:"black"}} value="Chaussure">Chaussure</option>
              <option style={{color:"black"}} value="Vetement">Vetement</option>
              <option style={{color:"black"}} value="Electronique">Electronique</option>
              <option style={{color:"black"}} value="design">Design</option>
              <option style={{color:"black"}} value="animation">Animation</option>
              <option style={{color:"black"}} value="Books">Books</option>
              <option style={{color:"black"}} value="Fourniture">Fourniture</option>
              <option style={{color:"black"}} value="Fourniture">other</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Image de couverture</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Charger Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Creer</button>
          </div>
          <div className="details">
            
            <label htmlFor="">Temps de livraison (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
           
          
            <label htmlFor="">Ajouter des features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Prix</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
  );
};

export default Add;