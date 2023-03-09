import express from "express";
import cors from "cors";

import { sample_foods, sample_tags } from "./data";
import foodRouter from './routes/food.route'
import userRouter from './routes/user.route'
const verifyJWT = require('./middlewares/verifyJWT');
const connectDB = require('./config/dbConfig');
const mongoose = require('mongoose');

require('dotenv').config({path:"../.env"});
connectDB();
// const server = http.createServer(app);

const app= express();
app.use((cors)({
 credentials:true,
 origin:["http://localhost:4200"]
}))
app.use(express.json())
app.use("/api/foods",foodRouter)
// app.use(verifyJWT);
app.use("/api/users",userRouter)


const Port =5000;

mongoose.connection.once('open', () => {
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
    console.log('connected to mongoDB');
  });

