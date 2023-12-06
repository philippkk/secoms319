import React, { useState } from "react";

const Read = () => {
  const [products, setProducts] = useState([]);
  const [IDSearch, setIDSearch] = useState("");

  function getProductByID() {
    // Get single product here ///////////////////////////////////////////////////////////
    setProducts("");
  }

  function getProducts() {
    // Get all products here ///////////////////////////////////////////////////////////
    setProducts("");
  }

  const productCards = products.map((product) => {
    return <Product product={product} />;
  });

  return (
    <div>
      <div>
        Show: 
        <button onClick={() => getProducts()}> All </button>
        <button onClick={() => getProductByID(IDSearch)}> One </button>
        <input
          type="text"
          value={IDSearch}
          onChange={(e) => setIDSearch(e.target.value)}
          placeholder="ID to find"
        />
      </div>
      <div>{productCards}</div>
    </div>
  );
};

const Product = ({product}) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <image src={product.image}></image>
      <div>
        <p>{product.description}</p>
      </div>
      <div>Price: ${product.price}</div>
      <div>
        {product.rating}/5.0 by {product.ratingCount} users
      </div>
    </div>
  );
};

export default Read;
