import React from "react";
import { FaHome, FaUser, FaCog, FaChartBar } from "react-icons/fa"; 
import { GrResources } from "react-icons/gr";

const Sidebar = () => {
  return (
    <div className="h-100vh w-[18%]  bg-white text-black flex flex-col">
      <div className="p-4 text-center text-2xl font-bold flex mt-8">
       <div>
       <GrResources className="text-[#5e1b72] mt-1"/>
       </div>
       <div>
       <h2 className="text-[#5e1b72]">HRFlow</h2>
       </div>

    
      </div>
      <div className="flex-1 p-4">
        <ul>
          <li className="mb-6">
            <a
              href="/"
              className="flex items-center space-x-2 hover:bg-[#DBDBDB] p-2 rounded"
            >
              <FaHome className="text-[#5e1b72]"/>
              <span>Home</span>
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/profile"
              className="flex items-center space-x-2 hover:bg-[#DBDBDB] p-2 rounded"
            >
              <FaUser className="text-[#5e1b72]"/>
              <span>Profile</span>
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/analytics"
              className="flex items-center space-x-2 hover:bg-[#DBDBDB] p-2 rounded"
            >
              <FaChartBar className="text-[#5e1b72]"/>
              <span>Analytics</span>
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/settings"
              className="flex items-center space-x-2 hover:bg-[#DBDBDB] p-2 rounded"
            >
              <FaCog className="text-[#5e1b72]"/>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
