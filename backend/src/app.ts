import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import dotenv from 'dotenv';


const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Montar todas las rutas bajo /api
app.use('/api', apiRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});