import {Request, Response} from 'express';
import {RowDataPacket, ResultSetHeader} from 'mysql2';
import tasksDB from '../services/database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
dotenv.config();

interface LoginRequestBody {
  email: string;
  password: string;
};

interface User extends RowDataPacket {
  email: string;
  password: string;
  auth: boolean;
  id: number;
};

export const loginController=async (req: Request<{},{},LoginRequestBody>, res: Response): Promise<void>=> {
    
    const {email, password} = req.body;
    try {
        const [mail] = await tasksDB.query<User[]>('SELECT * FROM users WHERE email = ?', [email]);

        if (mail.length === 0) {
            res.status(400).json({message: 'Email not found'});
            return;
        };

        const user={
            email: mail[0].email,
            password: mail[0].password,
            auth: mail[0].auth,
            id: mail[0].user_id
        };


        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                    res.status(500).json({message: 'Error comparing password'});
                    return;
            }
                
            if (result) {
                    // Contraseña correcta
                    let token = jsonwebtoken.sign(
                    { 
                        userId: user.id, 
                        email,           
                        auth: true              
                    },
                    process.env.JWT_SECRET!);

                    // Set the token in a cookie
                    res.cookie('user', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'
                    });
                    
                    res.status(200).json({message: 'Login successful', id:user.id});
            } else {
                    // Contraseña incorrecta
                    res.status(401).json({message: 'Incorrect password'});
             }
    });
        
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
        return;
    }

}