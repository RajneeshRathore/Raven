import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

// Application middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



export default app;