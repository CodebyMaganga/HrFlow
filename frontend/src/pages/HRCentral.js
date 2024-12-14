import { TabView, TabPanel } from "primereact/tabview";
import "../index.css";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Avatar from "react-avatar";
import { MdOpenInNew } from "react-icons/md";
import { Skeleton } from "primereact/skeleton";
import { CiSearch } from "react-icons/ci";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import SalaryLineChart from "../components/salaryChart";

const HRCentral = () => {
  const [users, setUser] = useState([]);
  const [departments, setDepartment] = useState(null);
  const [payrolls, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setModal] = useState(false);
  const [input, setInput] = useState(null);
  const [date, setDate] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [employeedepartment, setemployeedepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");

  const [empID, setEmpId] = useState("");

  const currentMonth = dayjs().format("MMMM");

  console.log("currentMonth", currentMonth);

  const genderOptions = ["Male", "Female", "Prefer not to say"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");
        const data = await response.json();
        setUser(data.users);

        console.log("all users--->", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch("/departments");
        const data = await response.json();
        setDepartment(data.departments);

        console.log("all dept--->", departments);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchPayrolls = async () => {
      try {
        const response = await fetch("/payroll/all-payrolls");
        const data = await response.json();
        setPayroll(data.sortedPayrolls);
        console.log("payroll", data);
      } catch (error) {
        console.error("Error fetching payroll:", error);
      }
    };

    fetchUsers();
    fetchDepartments();
    fetchPayrolls();

    setLoading(false);
  }, []);

  const findDepartment = (id) => {
    const result = departments.find((dept) => dept._id === id);

    return result?.name;
  };

  const departmentBody = (rowData) => {
    return findDepartment(rowData?.department);
  };

  const employeeAvatar = (employee) => {
    return <Avatar name={employee} round={true} size="30" />;
  };

  const avatarBody = (rowData) => {
    return employeeAvatar(rowData.fullName);
  };

  const renderEyeIcon = () => {
    return <MdOpenInNew />;
  };

  const iconBody = () => {
    return renderEyeIcon();
  };

  const saveEmployee = async () => {
    try {
      const response = await fetch("/users/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          address,
          gender,
          email,
          password,
          dob,
          employeedepartment,
          jobTitle,
          salary,
          dateOfJoining,
          employeeID: empID,
        }),
      });
      const result = await response.json();
      console.log("response", response);
      if (response.status === 200) {
        success();
      } else {
        error();
      }
    } catch (error) {
      error();

      console.log("error adding user", error);
    }
  };
  const formatNumber = (number) => {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const allPayrollEmployees = (month) => {
    const payrollEmployees = payrolls.find(
      (el) => el.month === month
    ).employees;

    console.log("users", users);
    const employeeNames = payrollEmployees.map((employeeId) => {
      const user = users.find((user) => user._id === employeeId);
      return user ? user.fullName : "Unknown Employee";
    });
  };

  // allPayrollEmployees('December')

  const payrollTotalSalary = (month) => {
    const payrollEntry = payrolls.find((el) => el.month === month);

    if (!payrollEntry) {
      return 0; // Return 0 if no payroll entry is found for the month
    }

    const payrollEmployees = payrollEntry.employees;

    // Calculate total salary
    const totalSalary = payrollEmployees.reduce((acc, employeeId) => {
      const user = users.find((user) => user._id === employeeId);
      const employeeSalary = user ? user.salary : 0; // Get the salary or 0 if not found
      return acc + employeeSalary; // Accumulate the total salary
    }, 0); // Initial value for accumulator is 0

    return `ksh ${formatNumber(totalSalary)}`; // Return the total salary
  };

const setStatus = (month) => {
  console.log('month',month)
  console.log('current month',currentMonth)

  if(month === currentMonth){
    return <p className="bg-[#278510] text-white text-center rounded-lg">Open</p>
  }
  else{
    return <p className="bg-[#9e19b2] text-white text-center rounded-lg">Closed</p>
  }

}

  const success = () =>
    toast.success("Employee added succesfully", {
      className: "bg-green-400",
    });

  const error = () =>
    toast.error("Error adding employee", {
      className: "bg-red-400",
    });

  return (
    <div className="card ml-4 mt-2 h-[1390px] text-black bg-white w-[80vw] p-4 relative">
      <ToastContainer />

      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <p className="text-center font-bold text-lg my-2">Personal Details</p>
          <div className="flex flex-row my-4">
            <div className="w-1/3">
              <p>Full Name</p>
              <InputText
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-stone-200"
              />
            </div>
            <div className="w-1/3">
              <p>Phone Number</p>
              <InputText
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+2547XXXXXX"
                className="bg-stone-200"
              />
            </div>
            <div className="w-1/3">
              <p>Address</p>
              <InputText
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-stone-200"
              />
            </div>
          </div>
          <div className="flex flex-row my-4">
            <div className="w-1/3">
              <p>Gender</p>
              <InputText
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="bg-stone-200"
              />
            </div>

            <div className="w-1/3">
              <p>Email</p>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-stone-200"
              />
            </div>
            <div className="w-1/3">
              <p>Password</p>
              <InputText
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-stone-200"
              />
            </div>
          </div>
          <div className="flex flex-row my-4">
            <div className="w-1/3">
              <p>Date of Birth</p>
              <InputText
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-stone-200"
              />
            </div>
            <div className="w-1/3">
              <p>Profile Picture</p>
              <InputText className="bg-stone-200" />
            </div>
          </div>

          <div>
            <p className="text-center font-semibold text-lg my-2">
              Employment Details
            </p>
            <div className="flex flex-row my-4">
              <div className="w-1/3">
                <p>Department</p>
                <InputText className="bg-stone-200" />
              </div>
              <div className="w-1/3">
                <p>Job Title</p>
                <InputText
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-stone-200"
                />
              </div>
              <div className="w-1/3">
                <p>Salary</p>
                <InputText
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="bg-stone-200"
                />
              </div>
            </div>
            <div className="flex flex-row my-4">
              <div className="w-1/3">
                <p>Date Of Joining</p>
                <InputText
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  className="bg-stone-200"
                />
              </div>
              <div className="w-1/3">
                <p>Employee ID</p>
                <InputText
                  value={empID}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="bg-stone-200"
                />
              </div>
            </div>
          </div>

          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex flex-row gap-2">
                <button
                  onClick={saveEmployee}
                  className="btn bg-[#3B1347] text-white"
                >
                  Save Employee{" "}
                </button>
                <button className="btn bg-white px-4 text-black border border-[#3B1347] hover:text-white">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <TabView className="custom-tabview">
        <TabPanel header="Employees">
          <div className="flex  gap-4 items-center absolute top-[70px] right-10">
            <div>
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="p-3 rounded-lg bg-[#F4D1FF]"
              >
                Add Employee +
              </button>
            </div>
            <div className="flex justify-end ">
              <div className="flex gap-4 relative border rounded-lg  ">
                <div className="absolute top-3 left-3 ">
                  <CiSearch className="text-lg text-stone-500" />
                </div>
                <div>
                  <input
                    className="bg-white text-black rounded-xl w-[300px] px-8 py-2"
                    placeholder="Search Employee...."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[100px] h-[400px]">
            {loading ? (
              <DataTable
                className="border px-4 py-4"
                scrollable
                scrollHeight="800px"
                tableStyle={{ minWidth: "75vw" }}
              >
                <Column
                  body={<Skeleton width="40px" height="40px" />}
                  header=""
                ></Column>

                <Column body={<Skeleton />} header="Full Name"></Column>

                <Column body={<Skeleton />} header="Job Title"></Column>

                <Column body={<Skeleton />} header="Department"></Column>

                <Column body={<Skeleton />} header="View"></Column>
              </DataTable>
            ) : (
              <DataTable
                className="border px-4 py-4"
                value={users}
                stripedrow
                scrollable
                scrollHeight="1200px"
                paginator
                rows={30}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "75vw" }}
              >
                <Column
                  className="border-b py-2"
                  body={avatarBody}
                  header=""
                ></Column>
                <Column
                  className="border-b"
                  field="fullName"
                  sortable
                  header="Full Name"
                ></Column>
                <Column
                  className="border-b"
                  field="jobTitle"
                  header="Job Title"
                ></Column>
                <Column
                  className="border-b"
                  body={departmentBody}
                  sortable
                  header="Department"
                ></Column>
                {/* <Column
                className="bg-green-200 border-b rounded-xl text-green-400 text-center"
                field="status"
                header="Status"
              ></Column> */}
                <Column
                  className="mx-4 border-b"
                  body={iconBody}
                  header="View"
                ></Column>
              </DataTable>
            )}
          </div>
        </TabPanel>
        <TabPanel header="Payroll">
          <div className="flex">

          </div>
          <div className="mt-8">
          {/* <h2 className="text-xl text-center font-bold mb-4">Salary Progression</h2> */}
      {payrolls && users ? (
        <SalaryLineChart payrolls={payrolls} users={users} />
      ) : (
        <p>Loading chart data...</p>
      )}
          </div>
        
         
          <div className="mt-[80px] border px-4 rounded-lg">
            <p className="text-xl text-center font-bold my-4">All Payroll</p>

            <DataTable
              className="border px-4 py-6"
              value={payrolls}
              stripedrow
              scrollable
              scrollHeight="500px"
              paginator
              rows={30}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "75vw" }}
            >
              <Column
                className="border-b py-3"
                field="month"
                sortable
                header="Month"
              ></Column>
              <Column
                className="border-b"
                header="Number of Employees"
                body={(rowData) => rowData.employees.length} // Use a function to access the length of employees
              ></Column>

              <Column
                className="border-b"
                field="payrollDate"
                header="Closing Date"
              ></Column>

              <Column
                className="border-b"
                header="Total Salary"
                body={(rowData) => payrollTotalSalary(rowData.month)} // Use a function to access the length of employees
              ></Column>

              <Column

className="border-b text-center px-2"
                header="Status"
                body={(rowData) => setStatus(rowData.month)}
              ></Column>
              <Column
                className="mx-4 px-2 border-b"
                body={iconBody}
                header="View"
              ></Column>
            </DataTable>
          </div>
        </TabPanel>
        <TabPanel header="Header III">
          <p className="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabView>

      <Dialog
        header="Add Employee"
        visible={showModal}
        style={{ width: "60vw", height: "40vh" }}
        onHide={() => {
          if (!showModal) return;
          setModal(false);
        }}
        className="text-black shadow-xl rounded-lg px-4 bg-white border"
      >
        <p className="text-center">Personal Details</p>
        <div className="flex ">
          <div className="w-1/3">
            <label>Full Name</label>
            <InputText
              className="bg-white border mt-4 ml-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label>Email</label>
            <InputText
              className="bg-white border mt-4 ml-4 h-[30px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="w-1/3">
            <label>Date Of Birth</label>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default HRCentral;
