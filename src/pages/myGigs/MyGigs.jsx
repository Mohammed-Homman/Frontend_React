import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import newResquest from "../../utils/newRequest";

function MyGigs() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const response = await newResquest.get(`api/Product/myProducts?userId=${currentUser?.userId}`);
        console.log(currentUser?.userId);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleDelete = async (productId) => {
    try {
      await newResquest.delete(`api/Product/${productId}`);
      console.log("Successfully deleted");
      setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Mes articles</h1>
            {/* Add your add product link here */}
          </div>
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Price</th>
                <th>deliveryTime</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td>
                    <img className="image" src={product.cover} alt="" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.deliveryTime}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      onClick={() => handleDelete(product.productId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
