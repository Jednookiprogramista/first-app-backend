import express from "express";
import {login, logout, registration} from "../controllers/auth";


export const authRoutes = express.Router()


authRoutes.post('/login',login)
authRoutes.post('/registration',registration)
authRoutes.post('/logout',logout)
