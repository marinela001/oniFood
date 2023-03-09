
import {Router} from 'express';
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');

const router = Router();

router.post('/', authController.handleLogin);
router.post('/register', registerController.handleNewUser);


export default router;
