import mongoose from "mongoose";


export const Connection=async(username,password)=>{
    try {
        const URL='mongodb+srv://insomniamusic999:<DukiDaso999>@cluster0.sqtldip.mongodb.net/ECOMMERCE?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(URL,{ useUnifiedTopology:true, useNewUrlParser:true });
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting database",error.message);
    }
}

export default Connection;
