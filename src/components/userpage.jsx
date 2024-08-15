import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";


const GoToUser = ({items, setItems})  =>{

  
  const [inputs, setInputs] = useState({
    itemName:"" ,
    itemType:"",
    quantity:""
  });
  
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!inputs.itemName || !inputs.itemType || !inputs.quantity) {
          alert("Please Fill All ! ");
          return; // Prevent form submission if inputs are empty
        }
       
    try{
      const response = await fetch ("http://127.0.0.1:5000/item", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
  
      
			if (!response.ok) {
        const data = await response.json();
				throw new Error(data.error);
			}
      else
      alert(`Item Created ^^`)
    
      const result = await response.json();
      setItems([...items, result]);
      console.log('Item created:', result);
     
    } 
    catch (error) {
      console.error('Error creating item:', error);
      // alert(`Failed to create item: ${error.message}`);
    }
  };
    
  

   return(

  <>
    <nav className="navbar bg-body-tertiary">
            <div className="container-fluid  justify-content-center"> 
              <h1 className="navbar-brand mb-2"><strong>Inventory Management System</strong></h1>
            </div>
    </nav>
    <div className="container vh-100 d-flex justify-content-center align-items-center" style={{backgroundColor:"#D8C6DF" }}>
        
        <form onSubmit={handleSubmit} style={{width: "40%", minWidth: "300px"}} >
          <div>
  
            <div className="form-group mb-4">
                <input 
                placeholder="Item name"
                type="text"
                className="form-control"
                id="itemName"
                value={inputs.itemName}
                onChange={(e) => setInputs({... inputs, itemName: e.target.value})}
                 />
            </div>

            <div className="form-group mb-4">
                <input type="text"
                className="form-control"
                id="itemType"
                value={inputs.itemType}
                onChange={(e) => setInputs({...inputs, itemType: e.target.value})}  placeholder="Item type"/>
            </div>

            <div className="form-group mb-4">
                <input type="text"
                className="form-control"
                id="quantity"
                value={inputs.quantity}
                onChange={(e) => setInputs({...inputs, quantity: e.target.value})}  placeholder="Quantity"/>
            </div>

            <div className="d-flex justify-content-between">
                <button setInputs={inputs} type="submit" className="btn btn-primary"  style={{backgroundColor:"#4A235A", color:"white" }}>
                Add
                </button>

               <Link to={"/itemTable"}>
                  <button type="button" className="btn btn-primary" style={{backgroundColor:"#4A235A" ,color:"white"}}>
                  Go To items
                  </button>
               </Link> 
            </div>

          </div>
        </form> 
    </div>
  </>   
   );

}

export default GoToUser;

// const [itemName, setItemName] = useState('');
// const [itemType, setItemType] = useState('');