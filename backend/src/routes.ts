import { Router } from 'express';
import {registerController } from './controllers/registerController';
import { loginController } from './controllers/loginController';

const router = Router();

// Ejemplo de ruta: GET /api/todos
router.post('/register', registerController);
router.post('/login', loginController)

export default router;
