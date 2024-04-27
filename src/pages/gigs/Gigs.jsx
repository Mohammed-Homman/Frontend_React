import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const minRef = useRef(0); // Default value is set to 0, adjust as needed
  const maxRef = useRef(1000); // Default value is set to 1000, adjust as needed
  const searchRef = useRef();

  const { search } = useLocation();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await newRequest.get(`api/Product/AllProducts/${search}&min=${minRef.current}&max=${maxRef.current}`);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const applyFilters = () => {
    fetchData();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Manzo / Graphics & Design /</span>
        <h1>AI Artists</h1>
        <p>
          Explorez les articles mises à votre entière disposition !
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={applyFilters}>Apply</button>
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig.productId} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
