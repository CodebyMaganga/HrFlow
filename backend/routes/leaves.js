const express = require("express");
const {
    getLeaves,
    getSingleLeave,
    createLeave,
    updateLeaves,
    deleteLeave,
} = require("../controllers/leavesController");

const router = express.Router();

//get
router.get("/", getLeaves);
router.get("/:id", getSingleLeave)

//post
router.post("/add-leave", createLeave);

//update
router.patch("/:id", updateLeaves);

//delete department
router.delete("/:id", deleteLeave);

// router.route('/:id').get(getSingleDepartment).put((req,res)=>{
//     res.json({message: `Update Department id ${req.params.id}`})
// }).delete((req,res)=>{
//     res.json({message: `Delete Department id ${req.params.id}`})
// })

// router.get("/:id", (req, res) => {
//   res.json({ message: `Get Leave id ${req.params.id}` });
// });

module.exports = router;
