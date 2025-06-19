import { Request, Response } from 'express';
export const logoutController = (req: Request, res: Response) => {
  // Eliminar la cookie de sesión
  res.clearCookie('user', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' //
  });

  // Responder al cliente
  res.status(200).json({ message: 'Logout successful' });
}
