const express = require("express");
const {
    getBenefit,
    getSingleBenefit,
    createBenefit,
    updateBenefit,
    deleteBenefit,
} = require("../controllers/benefitsController");

const router = express.Router();

//get
router.get("/", getBenefit);
router.get("/:id", getSingleBenefit);

//post
router.post("/add-benefits", createBenefit);

//update
router.patch("/:id", updateBenefit);

//delete department
router.delete("/:id", deleteBenefit);

// router.route('/:id').get(getSingleDepartment).put((req,res)=>{
//     res.json({message: `Update Department id ${req.params.id}`})
// }).delete((req,res)=>{
//     res.json({message: `Delete Department id ${req.params.id}`})
// })

// router.get("/:id", (req, res) => {
//   res.json({ message: `Get Department id ${req.params.id}` });
// });

module.exports = router;
