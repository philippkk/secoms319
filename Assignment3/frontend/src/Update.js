import React, { useState } from "react";

const Update = () => {
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
  const [price, setPrice] = useState(0);

  function save() {
    // Save price change to product here ///////////////////////////////////////////////////////////
    // product._id
    product.price = price; // This parallels the changes in the backend without re-retrieving backend info
    setProduct(product); // This should also update the 'Update' component, and update the original price
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <h2>{product._id}</h2>
      <image src={product.image}></image>
      <div>
        <p>{product.description}</p>
      </div>
      <div>Original ${product.price}</div>
      <div>
        New
        <input
          type="number"
          min="0.00"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button onClick={() => save()}>Save Changes</button>
      </div>
      <div>
        {product.rating}/5.0 by {product.ratingCount} users
      </div>
    </div>
  );
};

export default Update;
