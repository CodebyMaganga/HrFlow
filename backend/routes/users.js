const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addMultipleUsers
} = require("../controllers/userControllers");

const router = express.Router();

//get
router.get("/", getUsers);
router.get("/:user_id", getSingleUser);

//post
router.post("/add-user", createUser);

//update
router.patch("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//bulk upload users
router.post('/add-bulk', addMultipleUsers)

// router.route('/:id').get(getSingleUser).put((req,res)=>{
//     res.json({message: `Update user id ${req.params.id}`})
// }).delete((req,res)=>{
//     res.json({message: `Delete user id ${req.params.id}`})
// })

router.get("/:id", (req, res) => {
  res.json({ message: `Get user id ${req.params.id}` });
});

module.exports = router;
