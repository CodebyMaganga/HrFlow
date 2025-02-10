import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const EmployeePage = ({ users }) => {
  let params = useParams();
  const navigate = useNavigate();



  const [status, setStatus] = useState(null);
  const [empID, setEmpID] = useState(null);
  const [fullName, setfullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [location, setLocation] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [contact, setContact] = useState(null);
  const [departments, setDepartment] = useState(null);
  const [allDepartments, setAllDepartment] = useState(null);
  const [allLeaves, setLeaves] = useState(null);
  const [leaveSummary, setLeaveSummary] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [salary, setSalary] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [DOJ, setDOJ] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [edit, setEdit] = useState(false);

  const success = () =>
    toast.success("Employee details edited succesfully", {
      className: "bg-green-400",
    });

  const error = () =>
    toast.error("Error editin employee details", {
      className: "bg-red-400",
    });

    const handleGoBack = () =>{
      navigate('/HRCentral')
    }

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments`);
        const data = await response.json();
        setAllDepartment(data.departments);
      } catch (error) {
        console.error("Error fetching depts:", error);
      }
    };

    const fetchLeaves = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/leaves`);
        const data = await response.json();
        setLeaves(data.leaves);
    
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const number = getRandomNumber(70, 100);

    setRandomNumber(number);

    fetchDepartments();
    fetchLeaves();
    findEmployee();


  }, []);

  const findEmployee = () => {
 

    const employee = users.find((el) => el._id === params.user_id);


    setStatus(employee.status);
    setfullName(employee.fullName);
    setEmail(employee.email);
    setLocation(employee.address);
    setJobTitle(employee.jobTitle);
    setContact(employee.phoneNumber);
    setDepartment(employee.department);
    setEmpID(employee.employeeID);
    employee.DOB !== null
      ? setDOB(dayjs(employee.DOB).format("YYYY/MM/DD"))
      : setDOB("-");
    employee.gender !== null ? setGender(employee.gender) : setGender("-");
    setAddress(employee.address);
    setSalary(employee.salary);
    employee.isAdmin === false ? setAdmin("No") : setAdmin("Yes");
    setDOJ(dayjs(employee.DOJ).format("YYYY/MM/DD"));



    return employee.fullName;
  };

  const findDepartment = (deptId) => {


    if (!deptId || !allDepartments) return "";

    const result = allDepartments.find((dept) => dept._id === deptId);

 

    return result ? result.name : "Not Found";
  };

  useEffect(() => {
    const findEmployeeLeave = () => {
      if (allLeaves) {
        const employeeLeaves = allLeaves.filter(
          (leave) => leave.employee === params.user_id
        );

        const remainingLeaveDays = 20 - employeeLeaves.length;

        setLeaveSummary(remainingLeaveDays);
      }
    };

    findEmployeeLeave();
  }, [allLeaves, params.user_id]);

  const saveEmployeeDetails = async () => {
    const response = await fetch(`${API_BASE_URL}/users/${params.user_id}`, {
      method: "PATCH",
      ContentType: "application/json",
      body: JSON.stringify({
        empID,
        fullName,
        email,
        contact,
        DOB,
        gender,
        address,
        jobTitle,
        departments,
        status,
        salary,
        admin,
        DOJ,
      }),
    });

    const data = await response.json()



    if(data.status === 201){
      success()
    }
    else{
      error()
    }



    setEdit(false)


  };

  return (
    <>
  <div onClick={()=> handleGoBack()} className="flex flex-row items-center mx-4 my-4 cursor-pointer">
        <BiArrowBack className="mr-4 text-[2em] text-black"/>
        <p className="text-black text-lg">Back</p>
        </div>
      <div className="text-black bg-white w-[1100px] h-[1340px] ml-2">
        
        
        
      
      <ToastContainer />
        <div className=" h-[600px] px-4">
          <div className="flex gap-4 justify-between ">
            <div class="card mt-12 p-8 h-[30rem] border w-1/3 shadow-xl">
              <div class="card-body h-[40%] border rounded-lg">
                <div>
                  <p className="text-center mx-4">
                    <span className="font-medium">{fullName}</span>{" "}
                    <span className="mx-2">|</span>{" "}
                    <span
                      className={
                        status === "Active"
                          ? "text-center bg-emerald-200 px-4 rounded-lg "
                          : "text-center bg-red-200 px-4 rounded-lg"
                      }
                    >
                      {status}
                    </span>
                  </p>
                  <p className="text-center  mt-3">{jobTitle}</p>
                </div>

                <Avatar
                  className="ml-8 mt-2"
                  name={fullName}
                  round={true}
                  size="100"
                />
                <p className="text-center my-4 font-bold">{email}</p>
                <div className="flex flex-col gap-4  items-center mt-4">
                  <div className="flex flex-row w-[90%] justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <CiLocationOn className="text-xl" />
                      <p>Location</p>
                    </div>
                    <div>
                      <p>{location}</p>
                    </div>
                  </div>
                  <div className="flex flex-row w-[90%] justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <FaPhoneAlt className="text-xl" />
                      <p>Contact</p>
                    </div>
                    <div>
                      <p>{contact}</p>
                    </div>
                  </div>
                  <div className="flex flex-row w-[90%] justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <FaUserGroup className="text-xl" />
                      <p>Department</p>
                    </div>
                    <div>
                      <p className="ml-4">{findDepartment(departments)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3">
              <div class="card mt-12 p-8 h-[30rem] border  shadow-xl">
                <div class="card-body   h-[40%] border rounded-lg">
                  <div className="flex flex-row gap-6">
                    <div className="border px-2 rounded-lg p-8 w-1/2 bg-gradient-to-r from-[#f4f0f7] to-[#ac8ebe] drop-shadow-xl ">
                      <p className="font-medium text-center">
                        Remaining Leave Days
                      </p>
                      <p className="text-center mt-2">{leaveSummary}</p>
                    </div>
                    <div className=" px-2 rounded-lg p-8 w-1/2 bg-gradient-to-r from-[#f4f0f7] to-[#ac8ebe] drop-shadow-xl ">
                      <p className="font-medium text-center">
                        Remaining Work From Home Requests
                      </p>
                      <p className="text-center mt-2">4</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 mt-20">
                    <div className="border px-2 rounded-lg p-8 w-1/2 bg-gradient-to-r from-[#d9eee5] to-[#408c73] drop-shadow-xl ">
                      <p className="font-medium text-center">
                        Perfomance Review
                      </p>
                      <div
                        className="radial-progress ml-[80px]"
                        style={{
                          "--value": randomNumber,
                          "--size": "4rem",
                          "--thickness": "2px",
                        }}
                        role="progressbar"
                      >
                        {randomNumber}%
                      </div>
                    </div>
                    <div className=" px-2 rounded-lg p-8 w-1/2 bg-gradient-to-r from-[#fefaec] to-[#c87a2e] drop-shadow-xl ">
                      <p className="font-medium text-center">Attendance Rate</p>
                      <p className="text-center mt-2">Good</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border mt-8 h-[800px] shadow-lg">
            <div className=" ">
              <div className="flex justify-end">
                {!edit ? (
                  <div className="">
                    <button
                      onClick={() => setEdit(true)}
                      className="p-3 rounded-lg bg-[#F4D1FF] mt-4 mr-4"
                    >
                      Edit Employee Details
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <div>
                      <button
                        onClick={() => setEdit(false)}
                        className="p-3  rounded-lg border border-black mt-4 mr-4 hover:bg-black hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => saveEmployeeDetails()}
                        className="p-3 rounded-lg bg-[#F4D1FF] mt-4 mr-4 hover:bg-[#3b1347] hover:text-white"
                      >
                        Save Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-center text-xl">
                  Employee Details
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-center mt-8 space-y-4">
              <div className="w-1/3 ">
                {!edit ? (
                  <div>
                    <p className="font-medium">Employee ID</p>
                    <p className="text-stone-500">{empID}</p>
                  </div>
                ) : (
                  <div className="mt-4 ">
                    <p className="font-medium my-2">Employee ID</p>
                    <input
                      value={empID}
                      onInput={(e) => setEmpID(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>
              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Full Name</p>
                    <p className="text-stone-500">{fullName}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Full Name</p>
                    <input
                      value={fullName}
                      onInput={(e) => setfullName(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-stone-500">{email}</p>
                  </div>
                ) : (
                  <div className="">
                    <p className="font-medium my-2">Email</p>
                    <input
                      value={email}
                      onInput={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-stone-500">{contact}</p>
                  </div>
                ) : (
                  <div className=" ">
                    <p className="font-medium my-2">Contact</p>
                    <input
                      value={contact}
                      onInput={(e) => setContact(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Date Of Birth</p>
                    <p className="text-stone-500">{DOB}</p>
                  </div>
                ) : (
                  <div className=" ">
                    <p className="font-medium my-2">Date Of Birth</p>
                    <input
                      value={DOB}
                      onInput={(e) => setDOB(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Gender</p>
                    <p className="text-stone-500">{gender}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Gender</p>
                    <input
                      value={gender}
                      onInput={(e) => setGender(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-stone-500">{address}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Address</p>
                    <input
                      value={address}
                      onInput={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Job Title</p>
                    <p className="text-stone-500">{jobTitle}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Job Title</p>
                    <input
                      value={jobTitle}
                      onInput={(e) => setJobTitle(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-stone-500">
                      {findDepartment(departments)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Department</p>
                    <input
                      value={findDepartment(departments)}
                      onInput={(e) => setDepartment(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-stone-500">{status}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Status</p>
                    <input
                      value={status}
                      onInput={(e) => setStatus(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Salary</p>
                    <p className="text-stone-500">{salary}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Salary</p>
                    <input
                      disabled
                      value={salary}
                      onInput={(e) => setSalary(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Admin</p>
                    <p className="text-stone-500">{admin}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Status</p>
                    <input
                      value={status}
                      onInput={(e) => setStatus(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                {!edit ? (
                  <div>
                    <p className="font-medium">Date of Joining</p>
                    <p className="text-stone-500">{DOJ}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium my-2">Date of Joining</p>
                    <input
                      value={DOJ}
                      onInput={(e) => setDOJ(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-xs  input-bordered bg-white w-full max-w-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeePage;
