import PercentCard from "./percentageCards";
import LeaveCard from "./leavesCard";
import AttendanceCard from "./attendanceCard";
import BottomCard from "./bottomCard";
import { CiSearch } from "react-icons/ci";
import * as dayjs from 'dayjs'
import Lottie  from 'lottie-react';
import morning from '../assets/morning.json'



const Dashboard = ({users}) => {
    console.log('dashboard users--->',users)

    const currentHour = dayjs().hour()






  return (
    <div className="text-black w-[90%] ml-5  px-4  ">
      <div className="border rounded-lg px-2 py-8 bg-gradient-to-r from-purple-500 to-purple-900 flex justify-between items-center mt-12">
        <div className="">
          {/* <h3 className="font-semibold font-italic">Good Morning,Jane</h3> */}
          {currentHour >= 0 && currentHour <= 4 ? 
           <h3 className="font-semibold font-italic">Good Evening,Jane</h3>
          : currentHour > 4 && currentHour < 12 ?<div> 
            <h3 className="font-semibold font-italic">Good Morning,Jane</h3>
            <Lottie animationData={morning} loop={true} style={{ width: 50, height: 50 }}/>
            
          </div>  :
          currentHour >= 12 && currentHour < 16 ?
          <div className="flex items-center">
            <h3 className="font-semibold font-italic">Good Afternoon,Jane</h3> 
            <Lottie animationData={morning} loop={true} style={{ width: 50, height: 50 }}/>
            
             </div>
          :
          <h3 className="font-semibold font-italic">Good Evening,Jane</h3>
          }
        </div>
        <div className="flex justify-end">
          <div className="flex gap-4 relative  ">
            <div className="absolute top-3 left-3 ">
            <CiSearch  className="text-lg text-stone-500"/>
            </div>
          <div>
          <input className="bg-white text-black rounded-xl w-[300px] px-8 py-2"  placeholder="Search...."/>
          </div>
            
          </div>
        </div>
      </div>
      {/* show insight card with percentage */}
      <div className="flex justify-evenly gap-4 mt-4">
        <PercentCard title='Total Employees' users={users}/>
        <PercentCard title='Leaves' users={users}/>
        <PercentCard title='New Employees' users={users}/>
        <PercentCard title='Attendance' users={users}/>
        <PercentCard title='Payroll' users={users}/>
        <PercentCard title='Departments' users={users}/>
      </div>
      <div>
        <LeaveCard users={users}/>
      </div>
      <div >
        <AttendanceCard />
      </div>
      <div>
        <BottomCard />
      </div>

    </div>
  );
};

export default Dashboard;
