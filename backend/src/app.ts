import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

 export const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',  
    'http://localhost:3000',  
  ],
  credentials: true,  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Montar todas las rutas bajo /api
app.use('/api', apiRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});