import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();




dotenv.config();

app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("LifeLogs")
})

import dbConnect from './database/dbConnect.js';

dbConnect();

import blogs from './routes/blogs.js';

app.use('/api/v1', blogs)

app.listen(PORT, () => {
    console.log(`server is running at PORT: ${PORT}`);
})