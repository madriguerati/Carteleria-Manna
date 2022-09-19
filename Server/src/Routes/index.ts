import {Router} from 'express';

const router = Router();

import SignUp from './user/SignUp'



router.use('/user', SignUp)


export default router