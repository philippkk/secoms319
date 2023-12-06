import React, { useState } from "react";

const Create = () => {
  const [_id, set_id] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [rateCount, setRateCount] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit() {
    if(_id.length < 1) {
        setError("Error: please input an ID.");
        return;
    } else if (title.length < 1) {
        setError("Error: please input a title.")
        return;
    } else if (price < 0.01) {
        setError("Error: please input a price greater than $0.00.")
        return;
    } else if (description.length < 1) {
        setError("Error: please input a description.")
        return;
    } else if (category.length < 1) {
        setError("Error: please input a category.")
        return;
    } else if (image.length < 1) {
        setError("Error: please input an image.")
        return;
    }
    // Input create method here ////////////////////////////////////////////////////////
    
    set_id("");
    setTitle("");
    setPrice(0);
    setDescription("");
    setCategory("");
    setImage("");
    setRating(0);
    setRateCount(0);
    setError("");
  }

  return (
    <div>
      <input
        type="text"
        value={_id}
        onChange={(e) => set_id(e.target.value)}
        placeholder="ID"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="number"
        min="0.00" 
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image"
      />
      <input
        type="number"
        min="0"
        max="5"
        step="0.1"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
      />
      <input
        type="number"
        min="0"
        value={rateCount}
        onChange={(e) => setRateCount(e.target.value)}
        placeholder="Rate Count"
      />
      <div>
        {error}
      </div>
      <div><button onClick={() => handleSubmit()}>Submit</button></div>
    </div>
  );
};

export default Create;
