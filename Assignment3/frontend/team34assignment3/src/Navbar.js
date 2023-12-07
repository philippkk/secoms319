import React, { useState } from "react";
import Info from './Info.js';
import Create from './Create.js';
import Read from './Read.js';
import Update from './Update.js';
import Delete from './Delete.js';
import cart from './cart.png'

// Enum declaration
const View = {
	Info: 0,
	Create: 1,
	Read: 2,
	Update: 3,
    Delete: 4
}

const Navbar = () => {
    const [view, setView] = useState(View.Read);
    function handleViewChange(newView) {
        setView(newView);
    }

    let currentView;
    switch(view) {
        case View.Info:
            currentView = (<Info />);
            break;
        case View.Create:
            currentView = (<Create />);
            break;
        case View.Read:
            currentView = (<Read />);
            break;
        case View.Update:
            currentView = (<Update />);
            break;
        case View.Delete:
            currentView = (<Delete />);
            break;
            
    }

    return (
        <div className= "bg-slate-300  h-screen sticky top-0 z-50">
            <div className= "relative bg-slate-200 pl-2 pt-2 flex border-b-4 border-indigo-800 flex-1 overflow-y-auto">
                <img className="border-indigo-400 border-2 rounded-2xl w-16 h-16 hover:bg-indigo-400  " 
                onClick={() => handleViewChange(View.Info)}
                src={cart}/>


                <button className = " text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                 onClick={() => handleViewChange(View.Read)}>View Products</button>
                <button className = " text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                onClick={() => handleViewChange(View.Create)}>Add Product</button>    
                <button className = " text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                onClick={() => handleViewChange(View.Update)}>Update Products</button>
                <button className = " text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                onClick={() => handleViewChange(View.Delete)}>Delete Products</button>
                <button className = " text-lg rounded m-3 my-5 p-2  hover:bg-indigo-400 border-b-2 border-indigo-800 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                 onClick={() => handleViewChange(View.Info)}>Student Info</button>
            </div>
            <div>
                {currentView}
            </div>
        </div>
    );
}

export default Navbar;