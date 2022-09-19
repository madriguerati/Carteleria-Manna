import {Router} from 'express';

const router = Router();

import SignUp from './user/SignUp'
import SignIn from './user/SignIn'




router.use('/user', SignUp)
router.use('/user', SignIn)



export default router