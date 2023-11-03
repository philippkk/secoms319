import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Products } from "./Products";
import { Categories } from "./Categories";
import "./index.css";
import Shop from "./shopping.js";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const Handler = () => {
  const [state, setState] = useState(0);
  const [cardNum, setCardNum] = useState(0);
  let items = [];
  let total = 0;

  function Catalog() {
    console.log("Step 1 : load Products in a useState.");
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [query, setQuery] = useState("");

    function handleClick(tag) {
      console.log("Step 4 : in handleClick", tag);
      let filtered = Products.filter((cat) => cat.category === tag);
      // modify useState
      setProductsCategory(filtered);
      // ProductsCategory = filtered;
      console.log("Step 5 : ", Products.length, ProductsCategory.length);
    }

    const handleChange = (e) => {
      setQuery(e.target.value);
      console.log(
        "Step 6 : in handleChange, Target Value :",
        e.target.value,
        " Query Value :",
        query
      );
      const results = Products.filter((eachProduct) => {
        if (e.target.value === "") return ProductsCategory;
        return eachProduct.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setProductsCategory(results);
    };

    return (
      <div className="flex fixed flex-row">
        <div
          className="h-screen bg-slate-800 p-3 xl:basis-1/5"
          style={{ minWidth: "65%" }}
        >
          {/*<img className="w-full" src={logo} alt="Sunset in the mountains" />*/}
          <div className="px-6 py-4">
            <h1 className="text-3xl mb-2 font-bold text-white">
              {" "}
              Product Catalog App{" "}
            </h1>
            <p className="text-gray-700 text-white">
              by -{" "}
              <b style={{ color: "orange" }}>
                Design Shubham, Development Abraham
              </b>
            </p>
            <div className="py-10">
              {Categories ? <p className="text-white">Tags : </p> : ""}
              {Categories.map((tag) => (
                <button
                  key={tag}
                  className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2"
                  onClick={() => {
                    handleClick(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="py-10">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="search"
                value={query}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {console.log(
            "Before render :",
            Products.length,
            ProductsCategory.length
          )}
          {render_products(ProductsCategory)}
        </div>
      </div>
    );
  }

  const render_products = (ProductsCategory) => {
    const increment_product = (el) => {
      var exists = false;
      items.map((item) => {
        if (item.id == el.id) {
          item.quantity++;
          exists = true;
        }
      });
      if (!exists) {
        el.quantity = 1;
        items.push(el);
      }
    };
    const decrement_product = (el) => {
      var qty = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id == el.id) {
          items[i].quantity--;
          if (items[i].quantity <= 0) items[i].splice(i, 1);
          break;
        }
      }
    };

    return (
      <div className="category-section fixed">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({ProductsCategory.length})
        </h2>
        <div
          className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
          style={{ maxHeight: "800px", overflowY: "scroll" }}
        >
          {/* Loop Products */}
          {ProductsCategory.map((product, index) => (
            <div key={index} className="group relative shadow-lg">
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                    </a>
                    <p>Tag - {product.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Rating: {product.rating.rate}
                  </p>
                  <p>
                    {product.quantity}
                    <button onClick={decrement_product}>-</button>
                    <button onClick={increment_product}>+</button>
                  </p>
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  function Cart() {
    return <h1>hi</h1>;
  }
  function Confirm() {
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [query, setQuery] = useState("");

    function handleClick(tag) {
      console.log("Step 4 : in handleClick", tag);
      let filtered = Products.filter((cat) => cat.category === tag);
      // modify useState
      setProductsCategory(filtered);
      // ProductsCategory = filtered;
      console.log("Step 5 : ", Products.length, ProductsCategory.length);
    }
    function calcPrice() {
      Products.map((el) => (total += el.price));
      total = total.toFixed(2);
    }
    calcPrice();
    return (
      <div className="flex  flex-row overflow-scroll ">
        <div
          className="h-auto bg-slate-800 p-5 xl:basis-1/5 rounded"
          style={{ minWidth: "65%" }}
        >
          <div className="px-6 py-4">
            <h1 className="text-3xl mb-5 font-bold text-white bg-slate-600 rounded p-3">
              {" "}
              Confirm Your Order,{" "}
            </h1>
            <p className="text-gray-700 text-white bg-slate-500 rounded p-2">
              by -{" "}
              <b style={{ color: "lightblue" }}>Philip King, Cole Boltjes</b>
            </p>
            <div className="py-10 overflow-scroll">
              <h2 className="text-gray-700 text-white">Order Summary:</h2>
              <div class=" grid grid-cols-2 gap-x-5 gap-y-5 content-center overflow-scroll">
                <div>
                  {Products.map((el) => (
                    <div class=" grid grid-cols-2 gap-x-5 gap-y-5 content-center overflow-scroll">
                      <div class="flex">
                        <img
                          class="img-fluid rounded"
                          src={el.image}
                          width={40}
                        />
                        <p className="text-gray-700 text-white ">
                          1x {el.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-white ">${el.price}</p>
                      </div>
                      <p>
                        <hr />
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 text-white hover:text-sky-400">
                  {" "}
                  Order Total: ${total}
                </p>
              </div>
            </div>
          </div>
        </div>
        {confirmation()}
      </div>
    );

    function confirmation() {
      return (
        <div class="">
          <h1 class>FUCK</h1>
        </div>
      );
    }
  }
  function renderedComponent() {
    switch (state) {
      case 0:
        return <Confirm />;
      case 1:
        return <Cart />;
      case 2:
        return <Confirm />;
      default:
        return <Catalog />;
    }
  }
  return renderedComponent();
};
// rendering index.js :
root.render(
  <div>
    <Handler />
  </div>
);
