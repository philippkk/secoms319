import React, { useState } from "react";
import Info from './Info.js';
import Create from './Create.js';
import Read from './Read.js';
import Update from './Update.js';
import Delete from './Delete.js';

// Enum declaration
const View = {
	Info: 0,
	Create: 1,
	Read: 2,
	Update: 3,
    Delete: 4
}

const Navbar = () => {
    const [view, setView] = useState(View.Info);
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
        <div>
            <div>
                <button onClick={() => handleViewChange(View.Info)}>Student Info</button>
                <button onClick={() => handleViewChange(View.Create)}>Add Product</button>
                <button onClick={() => handleViewChange(View.Read)}>View Products</button>
                <button onClick={() => handleViewChange(View.Update)}>Update Products</button>
                <button onClick={() => handleViewChange(View.Delete)}>Delete Products</button>
            </div>
            <div>
                {currentView}
            </div>
        </div>
    );
}

export default Navbar;