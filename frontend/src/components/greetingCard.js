import { useState, useEffect } from "react";


const GreetingCard = () =>{
    const [timer, setTimer] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1); 
    }, 1000); 

   
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

    return (
        <div className="w-100 mt-16  shadow-xl ">
  <div className="card-body bg-white text-black  rounded-lg  ">
    <h2 className="card-title">Hi, User <span>&#128075;</span></h2>
    <p>Lets help you crush this recovery</p>
    <div className="flex justify-center items-center">
    <div className="radial-progress  " style={{ "--value": "70", "--size": "4rem", "--thickness": "2px" }} role="progressbar">Day 1</div>
    </div>
   
    {/* Display the countdown timer */}
    <p className="text-2xl mt-4 text-center">
          {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </p>
  </div>
</div>
    )
}

export default GreetingCard