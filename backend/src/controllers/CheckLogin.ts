import { Request, Response } from 'express';


export const CheckLogin = (req:Request, res:Response): void =>  {
    const cookie=req.cookies.user;
    if(cookie) {
        res.status(200).json({ message: 'User is logged in' });
    } else {
        res.status(401).json({ message: 'User is not logged in' });
    };
}