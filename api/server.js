import express, { json } from "express";
const app = express();
const PORT = 3000;


import cors from "cors";
app.use(cors({
    origin: 'https://www.andre.ca'
}));

app.use(json());

import negotiate from './middlewares/negotiate.js';
app.use(negotiate);

import logRoute from './routers/logRoutes.js';
app.use('/logs', logRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
