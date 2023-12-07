import React, { useState } from "react";

const Read = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [IDSearch, setIDSearch] = useState("");
  const [fetched, setFetched] = useState(false);
  

  if(!fetched){
    getProducts();
    setFetched(true);
  }
  function getProductByID() { 
    console.log(IDSearch);
    fetch("http://localhost:8081/getProducts/" + IDSearch)
    .then((response) => response.json())
    .then((data) => {
      setProduct(()=>{
        for (let i = 0; i < data.length; i++) {
          if(data[i].id == IDSearch){
            return data[i];
          }
        }
        return;
      });
    });
  }

  function getProducts() {
      setProduct(null);
      fetch("http://localhost:8081/getProducts")
        .then((response) => response.json())
        .then((data) => {

          setProducts(()=>{
            let arr = [];
            for (let i = 0; i < data.length; i++) {
              arr.push(data[i]);
            }
            return arr;
          });
        });
  }
  

  let productCards = product ? (
    <Product product={product} setProduct={setProduct} />
  ) : (
    products.map((product) => {
      return <Product product={product} />;
    })
  );


  return (
    <div className="bg-slate-300  flex-1 overflow-y-auto">
      <div className="flex my-2">
        <p className="text-lg m-2">Display:</p>
        <button className = " text-lg rounded p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 "
        onClick={() => getProducts()}> All </button>
        <button className = " text-lg rounded mx-2  p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 "
        onClick={() => getProductByID(IDSearch)}> One </button>
        <input
          type="text"
          value={IDSearch}
          onChange={(e) => setIDSearch(e.target.value)}
          placeholder="ID to find"
        />
      </div>
      <div className="grid grid-cols-4">{productCards}</div>
    </div>
  );
};

const Product = ({ product }) => {
  return (
    <div className="bg-white border-b-4 border-indigo-800 m-2 rounded">
      <h1 className="text-center text-lg"
      >{product.title}</h1>
      <hr className="h-4"></hr>
      <img className="w-48 object-center mx-auto"
       src={product.image}></img>
      <hr className="h-1 mt-1"></hr>
      <div className="m-2 ">
      <div>ID: {product.id} <br></br>

        Price: ${product.price} <br></br>
        {product.rating.rate}/5.0 by {product.rating.count} users </div>
        <div className="object-right"> 

        </div>
      </div>
      <hr></hr>
      <div >
        <p className="m-2 mt-0">
          {product.description}</p>
      </div>

    </div>
  );
};

export default Read;
