import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoute from './routes/auth.routs.js';
import msgRoute from './routes/messages.routs.js'
const app=express();


app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/msg',msgRoute);

app.get('/api/home',(req,res)=>{
    res.json({hello:"world"});
});

app.listen(process.env.PORT || 3000,()=>{

    console.log(`app listening on port:http://localhost:${process.env.PORT || 3000}`)
});
