const Interview = require('../models/interviewsModel')
const mongoose = require("mongoose");


//get Interview
const getInterviews = async(req,res) =>{
   

    try{
        const interviews = await Interview.find().sort({createdAt: -1})
        return res.status(201).json(interviews)
       
    }
    catch(err){
        return res.status(404).json({message: 'Failed to get interviews: ',err})
    }


}

//get a single user
const getSingleInterview = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "Invalid id" });
    }
  
    const singleInterview = await Interview.findById(id);
  
    if (!singleInterview) {
      res.status(404).json({ message: "Interview cant be found" });
    }
  
    res.status(200).json({ singleInterview});
  };



//create interview 
const createInterview = async(req,res) =>{

    const body = req.body

    const newInterview = await Interview.create(body)
    try{
        if(newInterview){
            res.status(200).json({message: `Interview created succesfully`,newInterview})
        }
    }
    catch(err){
        res.status(400).json({err})
    }
    
   
}

//update interview
const updateInterview = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid ID'})
    }

    try{
        const updatedInterview = await Interview.findByIdAndUpdate({_id:id}, {
            ...req.body
        })
    
      res.status(201).json({ message: `Interview updated successfully:`,updatedInterview });
    }
    catch(err){
        res.status(404).json({message: 'Update failed!: ',err})
    }

}

const deleteInterview = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid ID'})
    }

    const deletedInterview = await Interview.findOneAndDelete({_id:id})
    try{

    if(deletedInterview){
        res.status(201).json({ message: `Deleted successfully: ${deletedInterview}` });
    }

    }
    catch(err){
        res.status(404).json({message: 'Update failed!: ',err})
    }

}

module.exports ={
    getInterviews,
    getSingleInterview,
    createInterview,
    updateInterview,
    deleteInterview
}