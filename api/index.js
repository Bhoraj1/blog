import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB!", err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000 !");
});

app.use('/api/user', UserRoutes )
app.use('/api/auth', authRoutes);
 