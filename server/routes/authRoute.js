import express from 'express'
import { getMe, login, logOut, register } from '../controller/authController.js';
import { getUser } from '../middleware/userAuth.js';


const router =express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logOut)
router.get('/me',getUser,getMe)


export default router   