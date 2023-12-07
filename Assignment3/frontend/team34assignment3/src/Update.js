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
    fetch("http://localhost:8081/getProducts/" + IDSearch)
      .then((response) => response.json())
      .then((data) => {
        setProduct(() => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == IDSearch) {
              return data[i];
            }
          }
          return;
        });
      });
  }

  return (
    <div>
      <div className="flex m-2">
        <h1 className="text-lg mt-2">Product ID:</h1>
        <input
          className="rounded mx-2"
          type="text"
          value={IDSearch}
          onChange={(e) => setIDSearch(e.target.value)}
          placeholder="ID to find"
        />
        <button
          className=" text-lg rounded p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 "
          onClick={() => handleIDSearch()}
        >
          Search
        </button>
      </div>
      <div>{productCard}</div>
    </div>
  );
};

const Product = ({ product, setProduct }) => {
  const [price, setPrice] = useState(0);

  function save() {
    fetch("http://localhost:8081/updateProduct/" + product.id +"/" + price, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify()})
    product.price = price; // This parallels the changes in the backend without re-retrieving backend info
    setProduct(product); // This should also update the 'Update' component, and update the original price
  }

  return (
    <div className="bg-white border-b-4 border-indigo-800 m-2 rounded">
      <h1 className="text-center text-lg">{product.title}</h1>
      <hr className="h-4"></hr>
      <img className="w-48 object-center mx-auto" src={product.image}></img>
      <hr className="h-1 mt-1"></hr>
      <div className="m-2 ">
        <div>
          ID: {product.id} <br></br>
          Price: ${product.price} <br></br>
          {product.rating.rate}/5.0 by {product.rating.count} users{" "}
        </div>
        <div className="object-right"></div>
      </div>
      <hr></hr>
      <div>
        <p className="m-2 mt-0">{product.description}</p>
      </div>

      <hr></hr>
      <div className="flex m-2">
        <p>New Price: $</p>
        <input
          className="rounded mx-2"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ID to find"
        />
      </div>

      <button
        className=" text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 "
        onClick={save}
      >
        Save
      </button>
    </div>
  );
};

export default Update;
