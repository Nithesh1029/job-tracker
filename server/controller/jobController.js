import Job from "../model/jobModel.js";
import User from "../model/userModel.js";

export const newJob = async (req, res) => {
  try {
    const { company, role, status, jobType, applicationDate, notes } = req.body;
    if (
      !company ||
      !role ||
      !status ||
      !jobType 

    ) {
      return res.status(400).json({
        message: "these fields are required",
      });
    }

    const userId = req.user.id;

    const job = await Job.create({
      company,
      role,
      status,
      jobType,
      applicationDate,
      notes,
      createdBy: userId,
    });

    return res.status(201).json({message:"Job Application created successfully"});
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};


export const updateJob=async(req,res)=>{
  try {
    const userId = req.user.id;
    const user=await User.findById(userId)

    const {jobId} = req.params;
   

    const job=await Job.findById(jobId);
    
    if(!job){
      return res.status(500).json({message:"Job Application not found"});
    }
    if(job.createdBy.toString()!=user._id.toString()){
      return res.status(403).json({message:"Unauthorized try updating your own application"});
    }
    const updatedData={}
    const {status,notes,jobType}=req.body
    if(status!=""){
      updatedData.status=status
    }
    
    if(notes!=""){
      updatedData.notes=notes
    }
    
    if(jobType!=""){
      updatedData.jobType=jobType
    }
    const updatedJob=await Job.findByIdAndUpdate(jobId,updatedData,{
      new:true,
      runValidators:true,
    })

    return res.status(200).json({message:"Job updated successfully",job:updateJob})

  } catch (error) {
   return res.status(500).json({message:error.message});
  }
}

export const deleteJob=async(req ,res)=>{
  try {
    const {jobId}=req.params;
    const userId=req.user.id
    const job=await Job.findById(jobId)
    if(!job){
      return res.status(404).json({message:"Job not found"})
    }
    if(job.createdBy.toString()!=userId.toString()){
      return res.status(403).json({message:"unauthorized "})
    }
    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({message:"Job deleted successfully"});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
export const getAllJob = async (req,res) => {
  try {
    const userId = req.user.id;

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const jobs = await Job.find({
      createdBy: userId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalJobs=await Job.countDocuments({createdBy:userId});

    return res.status(200).json({
      totalJobs,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getJobById=async(req ,res)=>{
  try {
    const {jobId} = req.params;
    const userId = req.user.id;
    
    const jobData = await Job.findById(jobId);
    if(!jobData){
      return res.status(404).json({message:"Job not found"});
    }
      if(jobData.createdBy.toString() != userId.toString()){
        return res.status(403).json({message:"unauthorized"})
      }
    return res.status(200).json({jobData});
    
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}


export const uploadResume=async(req ,res)=>{
  try {
    const userId= req.user.id;
    const user=await User.findById(userId);
    if(user.resume!=""){
      return res.status(400).json({message:"Resume already exists, delete the existing one to upload a new resume"});
    }
    const {resume}=req.body;
    const updatedUser=await User.findByIdAndUpdate(userId,{resume},{new:true});
    return res.status(200).json({message:"Resume Updated",user:updatedUser})
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}

export const getResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if(!user.resume){
      return res.status(404).json({message: "No resume found",});
    }

    return res.status(200).json({
      resume: user.resume,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteResume=async(req,res)=>{
  try {
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user.resume){
      return res.status(400).json({message:"No resume found to delete"});
    }
     user.resume="";
     user.save();
    return res.status(200).json({message:"Resume deleted successfully"});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
 
