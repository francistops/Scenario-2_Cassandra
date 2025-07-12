import express, { json } from "express";
const app = express();
const PORT = 3000;

/**
 * Librairies et middlewares
 */
import cors from "cors";
app.use(cors({
    origin: 'https://www.andre.ca'
}));

app.use(json());

import negotiate from './middlewares/negotiate.js';
app.use(negotiate);

import { validateToken } from './middlewares/authGuard.js';

import logRoute from './routers/logRoutes.js';
app.use('/logs', logRoute);

import userRoute from './routers/userRoutes.js';
app.use('/users', validateToken, userRoute);

import authRoute from './routers/authRoutes.js';
app.use('/', authRoute);



/**
 * Serveur HTTP
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
