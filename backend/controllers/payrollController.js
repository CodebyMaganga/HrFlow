const Payroll = require('../models/payrollModel');
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

            // Save payroll entry to the database
            await payrollEntry.save();
        }

        console.log(`Payroll for ${month} ${year} has been successfully closed for all employees.`);
    } catch (error) {
        console.error('Error closing payroll:', error);
    }
}

// Example usage: Close payroll for October 2024
closePayrollForMonth('October', 2024);
