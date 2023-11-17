import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
const app = express();




dotenv.config();
app.use(morgan('default'));
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;


import dbConnect from './database/dbConnect.js';

dbConnect();

import blogs from './routes/blogs.js';

app.use('/api/v1', blogs)

app.listen(PORT, () => {
    console.log(`server is running at PORT: ${PORT}`);
})