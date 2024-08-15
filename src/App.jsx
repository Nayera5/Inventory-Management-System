import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import GoToUser from './components/userpage';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { useState,useEffect } from 'react';
import ItemList from './components/itemTable';


  export default function Myapp(){
      const [items, setItems] = useState([])
      const[users,setUsers] =useState([])

      useEffect( ()=>{
        fetchItems()
        fetchUsers()
      } , []);

      const fetchItems = async () =>{
        const response = await fetch("http://127.0.0.1:5000/item")
        if (!response.ok) {
          throw new Error("Network response was not ok");
      }
        const data= await response.json()
        console.log("Fetched data:", data);
        setItems(data.ITEMS || [])

      }

      const fetchUsers = async () =>{
        const response = await fetch("http://127.0.0.1:5000/user")
        if (!response.ok) {
          throw new Error("Network response was not ok");
      }
        const data= await response.json()
        console.log("Fetched data:", data);
        setUsers(data.USERS || [])

      }



      const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/delete/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted item from the state
                setItems(items.filter(item => item.id !== itemId));
            } else {
                console.error("Failed to delete the item.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }
    

      return(
      <>
        { <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/userpage" element={<GoToUser items={items} setItems={setItems} />} />
            <Route path="/itemTable" element={<><ItemList  items={items} deleteItem={deleteItem} /></>} />
            
          </Routes>
          
        </BrowserRouter> }

        
      </>
      );
  }

