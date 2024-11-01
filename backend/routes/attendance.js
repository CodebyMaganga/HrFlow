const express = require("express");
const {
    getAttendance,
    getSingleAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

//get
router.get("/", getAttendance);
router.get("/:id", getSingleAttendance);

//post
router.post("/add-attendance", createAttendance);

//update
router.patch("/:id", updateAttendance);

//delete department
router.delete("/:id", deleteAttendance);

// router.route('/:id').get(getSingleDepartment).put((req,res)=>{
//     res.json({message: `Update Department id ${req.params.id}`})
// }).delete((req,res)=>{
//     res.json({message: `Delete Department id ${req.params.id}`})
// })

// router.get("/:id", (req, res) => {
//   res.json({ message: `Get Department id ${req.params.id}` });
// });

module.exports = router;
