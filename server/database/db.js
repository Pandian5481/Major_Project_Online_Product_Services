import mongoose from "mongoose";


export const Connection=async(username,password)=>{
    try {
        const URL='mongodb://127.0.0.1:27017/ECOMMERCE';
        await mongoose.connect(URL,{ useUnifiedTopology:true, useNewUrlParser:true });
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting database",error.message);
    }
}

export default Connection;