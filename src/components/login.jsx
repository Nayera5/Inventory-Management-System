import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {


  const [inputs, setInputs] = useState({
    userName:"" ,
    password:"",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
         

    if (!inputs.userName || !inputs.password) {
      alert("Please fill in both the username and password.");
      return; // Prevent form submission if inputs are empty
    }

    try{
      const response = await fetch ("http://127.0.0.1:5000/user", {
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
      alert(`YES, User Created `)

      navigate('/userpage')
    
    } 

    catch (error) {
      console.error('Error creating item:', error);
      alert(`Failed to create item: ${error.message}`);
    }
    };





    return (
  <>
      <nav className="navbar bg-body-tertiary">
            <div className="container-fluid  justify-content-center"> 
              <h1 className="navbar-brand mb-2"><strong>Inventory Management System</strong></h1>
            </div>
      </nav>
      <div className="container d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:"#D8C6DF" }}>
        <form onSubmit={handleSubmit} style={{width: "25%", minWidth: "200px"}}>
           <h1 className="h3 mb-5 fw-normal" style={{ color:"#4A235A"}}><strong>Log In</strong></h1>
           
             
              <div className="form-group mb-4">
                <input type="text"
                className="form-control"
                id="userName"
                value={inputs.userName}
                onChange={(e) => setInputs({...inputs, userName: e.target.value})}  placeholder="User Name"/>
              </div> 

              <div className="form-group mb-4">
                <input type="password"
                className="form-control"
                id="password"
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value})}  placeholder="Password"/>
              
           </div>
           
             <button setInputs={inputs} className="btn btn-primary w-50 py-2" type="submit" style={{backgroundColor:"#4A235A" ,color:"white"}}>Log in</button>
     
        </form>
     </div>
  </>
    );
  }
  
  export default Login;