import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import {v4 as uuid} from 'uuid';

import Connection from './database/db.js';
import DefaultData from './default.js';
import router from './routes/route.js';

const app=express();

dotenv.config();

app.use(cors({
    origin:"*"
}));

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',router);
app.get('/',(req,res)=>{
    res.send("My service is live");
})

const PORT=8000;

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`);
});

DefaultData();

/*export const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export const paytmParams = {
    MID: process.env.PAYTM_MID,
    WEBSITE: process.env.PAYTM_WEBSITE,
    CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
    INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
    ORDER_ID: uuid(),
    CUST_ID: process.env.PAYTM_CUST_ID,
    TXN_AMOUNT: '100',
    CALLBACK_URL: 'http://localhost:8000/callback',
    EMAIL: 'ankitsn999@gmail.com',
    MOBILE_NO: '1234567890',
};*/
