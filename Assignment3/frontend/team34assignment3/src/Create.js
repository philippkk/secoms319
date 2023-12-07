import React, { useState } from "react";

const Create = () => {
  const [products, setProducts] = useState([]);
  const [IDSearch, setIDSearch] = useState("");
  const [fetched, setFetched] = useState(false);

  if(!fetched){
    getProducts();
    setFetched(true);
  }
  function getProducts() {
      fetch("https://fakestoreapi.com/products")
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
  const productCards = products.map((product) => {
    return <Product product={product} />;
  });

  return (
    <div className="bg-slate-300  flex-1 overflow-y-auto">
      <div className="flex my-2">
    
      </div>
      <div className="grid grid-cols-4">{productCards}</div>
    </div>
  );
};

const Product = ({ product }) => {
  function create(){
    fetch("http://localhost:8081/addProduct", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "id" : product.id,
        "title" : product.title,
        "price" : product.price,
        "description": product.description,
        "category" : product.category,
        "image" : product.image,
        "rating": {
          "rate": product.rating.rate,
          "count" : product.rating.count
        }
      }),
    })
  }
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
      <button className = " text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 "
        onClick={create}
        >Add Product</button>  
    </div>
  );
};

export default Create;




//OLD CREATE

  // const [_id, set_id] = useState("");
  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState(0);
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [image, setImage] = useState("");
  // const [rating, setRating] = useState(0);
  // const [rateCount, setRateCount] = useState(0);
  // const [error, setError] = useState("");

  // function handleSubmit() {
  //   if(_id.length < 1) {
  //       setError("Error: please input an ID.");
  //       return;
  //   } else if (title.length < 1) {
  //       setError("Error: please input a title.")
  //       return;
  //   } else if (price < 0.01) {
  //       setError("Error: please input a price greater than $0.00.")
  //       return;
  //   } else if (description.length < 1) {
  //       setError("Error: please input a description.")
  //       return;
  //   } else if (category.length < 1) {
  //       setError("Error: please input a category.")
  //       return;
  //   } else if (image.length < 1) {
  //       setError("Error: please input an image.")
  //       return;
  //   }
  //   // Input create method here ////////////////////////////////////////////////////////
    
  //   set_id("");
  //   setTitle("");
  //   setPrice(0);
  //   setDescription("");
  //   setCategory("");
  //   setImage("");
  //   setRating(0);
  //   setRateCount(0);
  //   setError("");
  // }

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       value={_id}
  //       onChange={(e) => set_id(e.target.value)}
  //       placeholder="ID"
  //     />
  //     <input
  //       type="text"
  //       value={title}
  //       onChange={(e) => setTitle(e.target.value)}
  //       placeholder="Title"
  //     />
  //     <input
  //       type="number"
  //       min="0.00" 
  //       step="0.01"
  //       value={price}
  //       onChange={(e) => setPrice(e.target.value)}
  //       placeholder="Price"
  //     />
  //     <input
  //       type="text"
  //       value={description}
  //       onChange={(e) => setDescription(e.target.value)}
  //       placeholder="Description"
  //     />
  //     <input
  //       type="text"
  //       value={category}
  //       onChange={(e) => setCategory(e.target.value)}
  //       placeholder="Category"
  //     />
  //     <input
  //       type="text"
  //       value={image}
  //       onChange={(e) => setImage(e.target.value)}
  //       placeholder="Image"
  //     />
  //     <input
  //       type="number"
  //       min="0"
  //       max="5"
  //       step="0.1"
  //       value={rating}
  //       onChange={(e) => setRating(e.target.value)}
  //       placeholder="Rating"
  //     />
  //     <input
  //       type="number"
  //       min="0"
  //       value={rateCount}
  //       onChange={(e) => setRateCount(e.target.value)}
  //       placeholder="Rate Count"
  //     />
  //     <div>
  //       {error}
  //     </div>
  //     <div><button onClick={() => handleSubmit()}>Submit</button></div>
  //   </div>
  // );