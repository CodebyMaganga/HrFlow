const Payroll =  require('../models/payrollModel');
const Employee = require('../models/userModel'); // Assuming you have an Employee model

async function closePayrollForMonth(month, year) {
    try {
        // Fetch all employees
        const employees = await Employee.find();

        // Iterate over each employee and create a payroll entry
        for (const employee of employees) {
            // Example: Calculate net pay (you can add more complex calculations here)
            const salaryAmount = employee.salary;
            const deductions = calculateDeductions(employee); // Custom function for deductions
            const bonuses = calculateBonuses(employee);       // Custom function for bonuses
            const netPay = salaryAmount - deductions + bonuses;

            // Create a new payroll entry for the employee
            const payrollEntry = new Payroll({
                employeeId: employee._id,
                salaryAmount,
                month,
                year,
                deductions,
                bonuses,
                netPay
            });
            console.log('payroll entry',payrollEntry)
            // Save payroll entry to the database
            await payrollEntry.save();
        }

        console.log(`Payroll for ${month} ${year} has been successfully closed for all employees.`);
    } catch (error) {
        console.error('Error closing payroll:', error);
    }
}

async function openPayrollForMonth(month, year, payrollDate, employees) {
    console.log('payrollDate',payrollDate)
    try {
        // Check if payroll for the specified month and year already exists
        const existingPayroll = await Payroll.findOne({ month, year });
        if (existingPayroll) {
            return { status: 400, message: `Payroll for ${month} ${year} is already open.` };
            
        }

        // Create a new payroll entry with all employee IDs
        const payrollEntry = new Payroll({
            employees, // Pass the array of employee IDs
            payrollDate, // Use the provided payroll date
            month,
            year,
        });

        // Save payroll entry to the database
        await payrollEntry.save();

        return { status: 201, message: `Payroll for ${month} ${year} has been successfully opened for all employees.` };
    } catch (error) {
        console.error('Error opening payroll:', error);
    }
}

const getPayrolls = async(req,res) =>{
    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    try {
        const allPayrolls = await Payroll.find()

        const sortedPayrolls = allPayrolls.sort((a, b) => {
            const monthA = monthOrder.indexOf(a.month);
            const monthB = monthOrder.indexOf(b.month);
            return monthB - monthA; // Sort in ascending order
        });
        res.status(201).json({sortedPayrolls});

       
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


module.exports = {
    closePayrollForMonth,
    openPayrollForMonth,
    getPayrolls
}
