import React from 'react';
import { useQuery } from '@tanstack/react-query';
import newResquest from "../../utils/newRequest";
import './Explore.scss';  
import GigCard from "../../components/gigCard/GigCard";
import { Link, Navigate, useLocation } from "react-router-dom";

const courseSearchUserFunction = (event) => {
  setSearchCourse(event.target.value);
};

async function fetchProducts() {
  const res = await newResquest.get('/api/Product/GetAllProducts');
  return res.data;
}
function Explore ()  {
  const { data: products, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
      <div className="gigs">
        <div className="container">
          <span className="breadcrumbs">Manzo / Graphics & Design /</span>
          <h1>AI Artists</h1>
          <p>Explorez les articles mises à votre entière disposition !</p>
          <div className="menu">
            <div className="left">
              <span>Budget</span>
              <input  type="number" placeholder="min" />
              <input  type="number" placeholder="max" />
              <button >Apply</button>
            </div>
          </div>
          <div className="cards">
            {products.map((product, index) => (
              <GigCard key={index} item={product} />
            ))}
          </div>
        </div>
      </div>
  );
};
export default Explore;
