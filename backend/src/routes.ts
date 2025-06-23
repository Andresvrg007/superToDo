import { Router } from 'express';
import {registerController } from './controllers/registerController';
import { loginController } from './controllers/loginController';
import { CheckLogin } from './controllers/CheckLogin';
import { logoutController } from './controllers/logoutController';
import { createDailyTaskController, getDailyTasksController, deleteDailyTaskController } from './controllers/DailyTaskController';


const router = Router();

// Ejemplo de ruta: GET /api/todos
router.post('/register', registerController);
router.post('/login', loginController)

router.get('/check-login', CheckLogin)
router.get('/logout', logoutController)

router.post('/daily-task', createDailyTaskController);
router.get('/daily-tasks', getDailyTasksController);
router.delete('/daily-task/:id', deleteDailyTaskController);


export default router;
