import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Products } from "./Products";
import { Categories } from "./Categories";
import "./index.css";
import Shop from "./shopping.js";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const Handler = () => {
  const [state, setState] = useState(0);
  const [personalInfo, setCardNum] = useState({name:"", cardNum:"", address:""});
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [cart, setCart] = useState([]);
  let total = 0;

  const Catalog = () => {
    const [catalogItems, setCatalogItems] = useState(ProductsCategory);
    const [query, setQuery] = useState("");

    const handleClick = (tag) => {
      let filtered = ProductsCategory.filter((cat) => cat.category === tag);
      // modify useState
      setCatalogItems(filtered);
    };

    const handleChange = (e) => {
      setQuery(e.target.value);
      const results = ProductsCategory.filter((eachProduct) => {
        if (e.target.value === "") return catalogItems;
        return eachProduct.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setCatalogItems(results);
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
                Design Philip King, Development Cole Boltjes
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
            <div>
              <button
                onClick={() => {
                  setState(1);
                  setCart(catalogItems.filter((prod) => prod.quantity > 0));
                  setCatalogItems(ProductsCategory);
                }}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {console.log(
            "Before render :",
            ProductsCategory.length,
            catalogItems.length
          )}
          {Render_products(catalogItems, false)}
        </div>
      </div>
    );
  };

  const Render_products = (ProductsCategory, cartView) => {
    const [fresh, setFresh] = useState(false);
    function refresh() {
      setFresh(!fresh);
    }
    const EndDescription = (product, index, cartView) => {
      if(!cartView)
        return Counter(product, index);
      return ProductTotal(product);
    }

    const ProductTotal = (product) => {
      return <div>
        Product Total: {("$" + (product.quantity * product.price).toFixed(2))}
      </div>
    }

    const Counter = (ignore, index) => {
      const setQty = (val) => {
        ProductsCategory[index].quantity = val;
        refresh();
      };

      return (
        <div>
          <input
            style={{ width: "100%" }}
            id={"counterNum" + index}
            type="number"
            value={ProductsCategory[index].quantity}
            onChange={(e) => {
              var val = isNaN(parseInt(e.target.value))
                ? 0
                : Math.max(parseInt(e.target.value), 0);
              e.target.value = val;
              setQty(val);
            }}
          ></input>
        </div>
      );
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
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                    </a>
                    <p>Tag - {product.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Rating: {product.rating.rate}
                  </p>
                  <div>{EndDescription(product, index, cartView)}</div>
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

  const Cart = () => {
    function total(){
      let totalVal = 0;
      for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price;
      }
      return ("$" + totalVal.toFixed(2));
    };


    const payment_info = () => {
      return (<div>
      </div>);
    }

    if (cart.length === 0)
      return (
        <div>
        <button onClick={()=>{setState(0)}}>Return to Store</button>
          <div>No Items in Cart</div>
        </div>
      );

    return (
      <div>
          <button onClick={()=>{setState(0)}}>Return to Store</button>
        <div>Order total: {total()}</div>
        <div>{payment_info}</div>
        <div>{Render_products(cart, true)}</div>
      </div>
    );
  };
  
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
        return <Catalog />;
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
