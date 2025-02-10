import { useEffect, useState } from "react";
import GreetingCard from "../components/greetingCard";
import Dashboard from "../components/dashboard";

const Home = () => {
  const [users, setUser] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        setUser(data);
     
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  



  return (
   <>
   <Dashboard users={users}/>
   </>
  );
};

export default Home;
