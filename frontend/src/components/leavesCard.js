import { useState, useEffect } from "react";
import Avatar from "react-avatar";
import dayjs from "dayjs";
import { Chart } from "primereact/chart";
import { TabView, TabPanel } from "primereact/tabview";

const LeaveCard = ({ users }) => {
  const [leaves, setLeaves] = useState(null);
  const [department, setDepartment] = useState(null);
  const [activeTab, setActiveTab] = useState(0); 
  const [chartTab, setChartTab] = useState(1)
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [genderChartData, setGenderChartData] = useState({});
  const [genderChartOptions, setGenderChartOptions] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const currentMonth = dayjs().format("MMMM");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/leaves`);
        const data = await response.json();
        setLeaves(data);
      
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments`);
        const data = await response.json();
        setDepartment(data);
       
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
    fetchDepartments();
  }, []);

  //Chart for Departments
  useEffect(() => {
    if (!department) return;
  
    // Get the computed style for document element
    const documentStyle = getComputedStyle(document.documentElement);
  
    // Define a color mapping for each department name
    const colorMapping = {
      HR: documentStyle.getPropertyValue("--blue-500") || "#BBD0FF", // Fallback color
      Finance: documentStyle.getPropertyValue("--yellow-500") || "#ffc107",
      "Procurement & Supply Chain":
        documentStyle.getPropertyValue("--green-500") || "#C8B6FF",
      "Marketing & Sales": documentStyle.getPropertyValue("--red-500") || "#dc3545",
      "Tech & AI": documentStyle.getPropertyValue("--red-500") || "#FFD6FF",
      "Administration": documentStyle.getPropertyValue("--red-500") || "#BBD0FF",
      "Legal": documentStyle.getPropertyValue("--red-500") || "#FF9E00"

    };
  
    const hoverColorMapping = {
      HR: documentStyle.getPropertyValue("--purple-400") || "#FFFCF", // Fallback color
      Finance: documentStyle.getPropertyValue("--yellow-400") || "#e0a800",
      "Procurement & Supply Chain":
        documentStyle.getPropertyValue("--green-400") || "#FFD6FF",
      "Marketing & Sales": documentStyle.getPropertyValue("--red-400") || "#c82333",
      "Tech & AI": documentStyle.getPropertyValue("--red-500") || "#E7C6FF",
      "Administration": documentStyle.getPropertyValue("--red-500") || "#C8B6FF"
    };
  
    const data = {
      labels: department.departments.map((dept) => dept.name), // Department names as labels
      datasets: [
        {
          // Get the number of employees per department
          data: department.departments.map((dept) => dept.employees.length),
          // Assign background colors based on department names
          backgroundColor: department.departments.map(
            (dept) =>
              colorMapping[dept.name] || documentStyle.getPropertyValue("--gray-500")
          ),
          hoverBackgroundColor: department.departments.map(
            (dept) =>
              hoverColorMapping[dept.name] || documentStyle.getPropertyValue("--gray-400")
          ),
        },
      ],
    };
  
    const options = {
      cutout: "80%",
    };
  
    setChartData(data);
    setChartOptions(options);
  }, [department]);

  //chart for Gender
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const colorMapping = {
      "Male": documentStyle.getPropertyValue("--blue-500") || "#BBD0FF", // Fallback color
      "Female": documentStyle.getPropertyValue("--yellow-500") || "#ffc107",
      "Polygender":
        documentStyle.getPropertyValue("--green-500") || "#C8B6FF",
      "Agender": documentStyle.getPropertyValue("--red-500") || "#dc3545",
      "Genderqueer": documentStyle.getPropertyValue("--purple-500") || "#FFD6FF",
      "Bigender": documentStyle.getPropertyValue("--velvet-500") || "#BBD0FF",
      "Genderfluid": documentStyle.getPropertyValue("--satin-500") || "#FF9E00"

    };
  
    // Create a unique array of gender values from the users
    const uniqueGenders = [...new Set(users?.users.map((user) => user?.gender))];
  
    // Count the occurrences of each gender for the dataset
    const genderCounts = uniqueGenders.map((gender) =>
      users?.users.filter((user) => user?.gender === gender).length
    );
  
    const data = {
      labels: uniqueGenders, // Use the unique gender array as labels
      datasets: [
        {
          data: genderCounts, // Set the counts of each gender as data
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500') || "#2D00F7",
            documentStyle.getPropertyValue('--yellow-500') || "#DB00B6",
            documentStyle.getPropertyValue('--green-500') || "#F20089",
            documentStyle.getPropertyValue('--red-500') || "#FF6D00",
            documentStyle.getPropertyValue("--purple-500") || "#FF9E00",
            documentStyle.getPropertyValue("--velvet-500") || "#5A189A"
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
  
    setGenderChartData(data);
    setGenderChartOptions(options);
  }, [users]);
  
  



  const findEmployee = (id) => {
    const result = users?.users.filter((user) => user._id === id);

    return result ? result[0].fullName : "";
  };

  const findEmployeePosition = (id) => {
    const result = users?.users.filter((user) => user._id === id);

    return result ? result[0].jobTitle : "";
  };

  const handleTabChange = (index) => {
    setActiveTab(index); // Update active tab index
  };
  const handleChartChange = (idx) =>{
    setChartTab(idx)
  }
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-[#F4D1FF]  text-sm rounded-lg px-4";
      case "Pending":
        return "bg-orange-300  text-sm rounded-lg px-4";
      case "Rejected":
      default:
        return "bg-red-500  text-sm rounded-lg px-4";
    }
  };

  const getUpcomingBirthdays = (users) => {
    const today = dayjs(); // Current date
    const upcomingBirthdays = users?.filter((user) => {
      let birthday = dayjs(user.dob);

      // If birthday this year has passed, calculate for the next year
      if (birthday.isBefore(today, "day")) {
        birthday = birthday.add(1, "year");
      }

      // Calculate the difference in days between today and the next birthday
      const daysUntilBirthday = birthday.diff(today, "day");

      // Filter for birthdays within the next 30 days
      return daysUntilBirthday >= 0 && daysUntilBirthday <= 30;
    });

    return upcomingBirthdays;
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="bg-white mt-10 rounded-lg flex-col">
            <div className="mt-4">
              <p className="text-center mt-2">What's on in {currentMonth}</p>
            </div>

            <div className="card">
              {/* Tab Headers */}
              <div className="flex justify-center mt-4 border-b">
                <div
                  className={`cursor-pointer py-2 px-4 ${
                    activeTab === 0
                      ? "border-b-2 border-blue-500 font-bold"
                      : ""
                  }`}
                  onClick={() => handleTabChange(0)}
                >
                  <p className="text-center">Leaves</p>
                </div>
                <div
                  className={`cursor-pointer py-2 px-4 ${
                    activeTab === 1
                      ? "border-b-2 border-blue-500 font-bold"
                      : ""
                  }`}
                  onClick={() => handleTabChange(1)}
                >
                  <p className="text-center">Birthdays</p>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 h-[46vh] overflow-y-scroll">
                {activeTab === 0 && (
                  <p>
                    {leaves &&
                      leaves.leaves.map((leave) => (
                        <div className="my-8 border-b">
                          <div className=" ">
                            <div className="flex justify-between items-center ">
                              <div className="flex gap-4">
                                <Avatar
                                  name={findEmployee(leave.employee)}
                                  round={true}
                                  size="30"
                                />

                                <p className="">
                                  {findEmployee(leave.employee)}
                                </p>
                              </div>
                              {/* <div className=" flex justify-center items-center ">
                                <div>
                                <p className="text-center">Center</p>
                                </div>
                                
                            </div> */}
                              <p className="text-center text-stone-400">
                                {findEmployeePosition(leave.employee)}
                              </p>
                              <div className="mr-6">
                                <p className={getStatusClass(leave.status)}>
                                  {leave.status}
                                </p>
                              </div>
                            </div>

                            <div className="ml-12">
                              <p className="text-stone-400 text-sm">
                                {leave.leaveType}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </p>
                )}
                {activeTab === 1 && <p>Content for Header II</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-[46vh]">
      <div  className="bg-white mt-10 rounded-lg flex flex-col  ">
        {/* Tab Headers */}
        <div className="flex justify-center">
          <button
            className={`cursor-pointer py-2 px-4 ${chartTab === 1 ? "border-b-2 border-blue-500 font-bold" : ""}`}
            role="tab"
            onClick={() =>  handleChartChange(1)}
          >
            Departments
          </button>
          <button
            className={`py-2 px-4 ${chartTab === 2 ? "border-b-2 border-blue-500 font-bold" : ""}`}
            role="tab"
            onClick={() =>  handleChartChange(2)}
          >Gender Summary
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 ">
          {chartTab === 1 && (
            <div className="">
             
              <div className="card flex justify-content-center items-center border m-2">
                <Chart
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
                  className="w-[80%] ml-4 h-[370px]"
                />
              </div>
            </div>
          )}
          {chartTab === 2 && (
            <div className="card flex justify-content-center items-center border m-2">
              <Chart type="pie" data={genderChartData} options={genderChartOptions} className="w-[80%] ml-4 h-[370px]" />
            </div>
          )}
        </div>
      </div>
    </div>
      </div>
    </>
  );
};

export default LeaveCard;
