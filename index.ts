import express, {Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";
const cookieParser = require('cookie-parser');
import {authRoutes} from "./routes/authentication";
import {userRoutes} from "./routes/users";
import { postRoutes } from "./routes/posts";
import {commentRoutes} from "./routes/comments";
import {likeRoutes} from "./routes/likes";


const app = express()


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',

}))
app.use(cookieParser)


// Routes


app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments',commentRoutes)
app.use('/api/likes',likeRoutes)
app.use('/api/authentication',authRoutes)













app.get('/',async(req :Request,res : Response)=> {
         throw new ValidationError('Wow');
})

app.use(handleError);

app.listen(3001,'0.0.0.0',()=> {
    console.log('Listening on port http://localhost:3001')
});