import express from 'express';
import { registerUser, loginUser, userProfile } from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.post('/register', registerUser);


userRouter.post('/login', loginUser);
userRouter.get('/user-Profile',userProfile);

export default userRouter;
