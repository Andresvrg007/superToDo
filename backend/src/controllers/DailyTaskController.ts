import { Request, Response } from 'express';
import tasksDB from '../services/database';
import jwt from 'jsonwebtoken';

export const createDailyTaskController = async (req:Request, res:Response):Promise<void>  =>  {

     try {
        const token = req.cookies.user;
        const { tittle, description } = req.body; 
        
        interface CustomJWTPayload {
            userId: number;
            email: string;
            auth: boolean;
            iat?: number;
            exp?: number;
        }
        
      
        
        if (!token) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJWTPayload;
        const id = decoded.userId;

        
        const [result] = await tasksDB.query(
            'INSERT INTO dailytasks (tittle, description, user_id, complete) VALUES (?, ?, ?, ?)',
            [tittle, description, id, false] 
        );
        
        
        res.status(201).json({ 
             message: 'Task created successfully',
                taskId: (result as any).insertId,
                task: {
                    id: (result as any).insertId,
                    tittle,
                    description,
                    user_id: id,
                    complete: 0
    }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
};


export const getDailyTasksController = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.user;

        if (!token) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const userId = decoded.userId;

        const [tasks] = await tasksDB.query(
            'SELECT * FROM dailytasks WHERE user_id = ?',
            [userId]
        );

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
}


export const deleteDailyTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.user;
        const taskId  = req.params.id;

        if (!token) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        const [result] = await tasksDB.query(
            'DELETE FROM dailytasks WHERE id = ?',
            [taskId]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Task not found or not authorized' });
            return;
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
}