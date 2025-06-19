import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import tasksDB from '../services/database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

interface RegisterRequestBody {
  email: string;  
  password: string;
}


interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  auth: boolean;
}

export const registerController = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {    
  let { email, password} = req.body;
  password = await bcrypt.hash(password, 10); 

  
  try {
    
    const [rows] = await tasksDB.query<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length !== 0) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const [result] = await tasksDB.query<ResultSetHeader>(
      'INSERT INTO users (email, password, auth) VALUES (?, ?, ?)', 
      [email, password, true] 
    );

    
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: result.insertId 
    });


    
  } catch (error) {
    res.status(500).json({ message: 'Error getting user', error });
  }
};