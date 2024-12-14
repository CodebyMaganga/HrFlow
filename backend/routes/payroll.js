const express = require("express");

const {
    closePayrollForMonth,
    openPayrollForMonth,
    getPayrolls
} = require('../controllers/payrollController')


const router = express.Router();

router.get('/all-payrolls',getPayrolls )

router.post('/close-payroll', async (req, res) => {
    const { month, year } = req.body; // Extract month and year from request body
    try {
        await closePayrollForMonth(month, year);
        res.status(200).json({ message: `Payroll for ${month} ${year} has been successfully closed.` });
    } catch (error) {
        res.status(500).json({ error: 'Error closing payroll.' });
    }
});


router.post('/open-payroll', async (req, res) => {
    const { month, year, payrollDate, employees } = req.body; // Extract month and year from request body
    try {
        const message = await openPayrollForMonth(month, year,payrollDate, employees);
        res.status(200).json({ message: message });
    } catch (error) {
        res.status(500).json({ error: 'Error opening payroll.' });
    }
});



module.exports = router;