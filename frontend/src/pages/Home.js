import { useEffect, useState } from "react";
import GreetingCard from "../components/greetingCard";
import Dashboard from "../components/dashboard";

const Home = () => {
  const [users, setUser] = useState(null);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");
        const data = await response.json();
        setUser(data);
        console.log("all users--->", data);
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
