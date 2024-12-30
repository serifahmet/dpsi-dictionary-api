import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import legalTermRoutes from './routes/legalTermRoutes';

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: config.allowedOrigins
}));

// Routes
app.use('/api/v1', legalTermRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Legal Dictionary API' });
});

export default app; 