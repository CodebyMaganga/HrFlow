
import './index.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home';
import Sidebar from './components/sidebar';
import HRCentral from './pages/HRCentral';
import EmployeePage from './pages/singleEmployee';
import { useEffect, useState } from "react";


function App() {
  const [users, setUser] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");
        const data = await response.json();
        setUser(data.users);
        console.log("all users--->", data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    

    fetchUsers();
 
  }, []);
  return (
    
    <div >

      <BrowserRouter>
      <div className='flex h-[1400px]'>
      
      <Sidebar className=""/>


      <div class>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/HRCentral' element={<HRCentral />} />
        <Route path="/users/:user_id" element={<EmployeePage users={users} />} /> 
      </Routes>
      </div>
      

      </div>
      
      </BrowserRouter>
  
    </div>
  );
}

export default App;
