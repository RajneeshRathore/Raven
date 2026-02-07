import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js'

const app = express();
app.use((req,res,next)=>{
    console.log("Request: ",req.method,req.url);
    next();
})
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));

// Application middlewares
app.use(express.json());//parse json data
app.use(cookieParser());//to parse cookies
app.use(express.urlencoded({ extended: true }));//to parse urlencoded data
app.use(express.static('public'));//to serve static files like images

//Route middlewares
app.use('/user/auth',authRoute);



//Global error middleware
app.use((err,req,res,next)=>{
    console.log("first err: ",err);//full error details in the console
    console.log("second err: ",err.message)//error message only
    return res.status(err.statusCode || 500).json({
      success:false,
      statusCode:err.statusCode || 500,
      message:err.message || 'Internal server error'
    });
});



export default app;