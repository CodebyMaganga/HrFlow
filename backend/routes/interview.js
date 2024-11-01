const express = require("express");
const {
  getInterviews,
  getSingleInterview,
  createInterview,
  updateInterview,
  deleteInterview,
} = require("../controllers/interviewController");

const router = express.Router();

//get
router.get("/", getInterviews);
router.get("/:id", getSingleInterview);

//post
router.post("/add-interview", createInterview);

//update
router.patch("/:id", updateInterview);

//delete user
router.delete("/:id", deleteInterview);



// router.route('/:id').get(getSingleUser).put((req,res)=>{
//     res.json({message: `Update user id ${req.params.id}`})
// }).delete((req,res)=>{
//     res.json({message: `Delete user id ${req.params.id}`})
// })


module.exports = router;
