import express from "express"
import { deleteJob, getAllJob, getJobById, getResume, newJob, updateJob, uploadResume } from "../controller/jobController.js";
import { getUser } from "../middleware/userAuth.js";
const router=express.Router();


router.post('/create-job',getUser,newJob);
router.put('/update/:jobId',getUser,updateJob);
router.delete('/delete/:jobId',getUser,deleteJob);
router.get('/get-resume',getUser,getResume)
router.get('/getall',getUser,getAllJob);

router.put('/upload-resume',getUser,uploadResume);
router.get('/:jobId',getUser,getJobById);
export default router   