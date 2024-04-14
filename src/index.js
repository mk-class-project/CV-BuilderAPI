import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectToMongoDB from './db/mongodb.js';

import apiRoutes from './routes/index.routes.js';

dotenv.config();
connectToMongoDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:1234', // parcel server
  credentials: true
}));
app.use(express.json());

app.use('/api/v1', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
