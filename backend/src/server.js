const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/index');
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Connected to database')).catch((err)=>console.log(err))
app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(process.env.PORT ||3000, ()=>{console.log('Backend Server running')})