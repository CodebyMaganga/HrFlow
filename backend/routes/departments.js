const express = require("express");
const {
  getDepartment,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

//get
router.get("/", getDepartment);
router.get("/:id", getSingleDepartment);

//post
router.post("/add-department", createDepartment);

//update
router.patch("/:id", updateDepartment);

//delete department
router.delete("/:id", deleteDepartment);

// router.route('/:id').get(getSingleDepartment).put((req,res)=>{
//     res.json({message: `Update Department id ${req.params.id}`})
// }).delete((req,res)=>{
//     res.json({message: `Delete Department id ${req.params.id}`})
// })

// router.get("/:id", (req, res) => {
//   res.json({ message: `Get Department id ${req.params.id}` });
// });

module.exports = router;
