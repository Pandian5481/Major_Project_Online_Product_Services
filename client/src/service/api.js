import axios from 'axios';

const URL='http://localhost:8000';

export const authenticateSignup=async(data)=>{
    try {
        return await axios.post(`${URL}/signup`,data);
    } catch (error) {
        console.log("Error while calling signup api",error);
    }
}

export const authenticateLogin = async (data) => {
    try {
        // Check if the provided credentials match the admin credentials
        if (data.username === 'admin123' && data.password === '12345') {
            // If admin credentials match, redirect to Admin.jsx
            window.location.href = '/Admin';
            return; // Return to prevent further execution
        }
        
        // If credentials are not admin credentials, make a POST request to login API
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log("Error while calling login api", error);
        return error.response;
    }
}

export const payUsingPaytm=async(data)=>{
    try {
        let response=await axios.post(`${URL}/payment`,data);
        return response.data;
    } catch (error) {
        console.log("Error while calling payment api",error);
    }
}

export const authenticateShop=async(data)=>{
    try {
        //console.log(data.email);
        return await axios.post(`${URL}/registershop`,data);
    } catch (error) {
        console.log("enter");
        console.log("Error while calling shop register api",error);
    }
}

