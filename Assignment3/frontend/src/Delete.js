import React, { useState } from "react";

const Delete = () => {
  const [product, setProduct] = useState(null);
  const [IDSearch, setIDSearch] = useState("");

  let productCard = product ? (
    <Product product={product} setProduct={setProduct} />
  ) : (
    <div> No Product Found </div>
  );

  function handleIDSearch() {
    // Set product from searching "IDSearch" here ///////////////////////////////////////////////////
    // Use setProduct(queried product here)
    // If unable to find product setProduct(null);
  }

  return (
    <div>
      <div>
        Product ID:
        <input
          type="text"
          value={IDSearch}
          onChange={(e) => setIDSearch(e.target.value)}
          placeholder="ID to find"
        />
        <button onClick={() => handleIDSearch()}>Search</button>
      </div>
    </div>
  );
};

const Product = ({ product, setProduct }) => {
  const [confirm, setConfirm] = useState(false);

  function remove() {
    if (confirm) {
      // Delete product here ///////////////////////////////////////////////////////////
      // product._id
      setProduct(null);
      setConfirm(false);
    } else setConfirm(true);
  }

  const removeText = confirm ? (
    <div>
      Remove Product: <button onClick={() => remove()}>Yes</button>
    </div>
  ) : (
    <div>
      Are you sure? <button onClick={remove()}>Yes</button>
      <button onClick={() => setConfirm(false)}>No</button>
    </div>
  );

  return (
    <div>
      <h1>{product.title}</h1>
      <h2>{product._id}</h2>
      <image src={product.image}></image>
      <div>
        <p>{product.description}</p>
        <div>Price: ${product.price}</div>
      </div>
      <div>
        {product.rating}/5.0 by {product.ratingCount} users
      </div>
      <div>{removeText}</div>
    </div>
  );
};

export default Delete;
