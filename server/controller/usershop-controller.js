import Shop from "../model/shop-schema.js";

export const userShop = async (request, response) => {
    try {
        
        const username = request.body.username;
        const shopData = request.body;
        //console.log(email);
        let existingUsername = await Shop.findOne({ username: username });
       // console.log(existingEmail);
        if (existingUsername) {
            existingUsername.shops.push(shopData);
            await existingUsername.save();
            response.status(200).json({ message: "Shop added to existing email." });
        } else {
            
            const newUsername = new Shop({
                username: username,
                shops: [shopData]
            });
            await newUsername.save();
            //console.log("enter");
            response.status(200).json({ message: "New email and shop added." });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getMyShops=async(request,response)=>{
    try {
        const username = request.params.username;
        let userShopData = await Shop.findOne({ username: username });

        if (userShopData) {
            let myShopData = userShopData.shops.filter(shop => shop.pending === false);
            //console.log(myShopData);
            response.status(200).json({ myShopData });
        } else {
            response.status(404).json({ message: "User shops not found" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getPendingShops=async(request,response)=>{
    try {
        const username = request.params.username;
        let userShopData = await Shop.findOne({ username: username });

        if (userShopData) {
            let myShopData = userShopData.shops.filter(shop => shop.pending === true);
            response.status(200).json({ myShopData });
        } else {
            response.status(404).json({ message: "User shops not found" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getAllPendingShops = async (request, response) => {
    try {
        // Find all shops where pending is true
        const pendingShops = await Shop.find({ "shops.pending": true });
        pendingShops.forEach(shop => {
           // console.log(shop.shops);
        });
        if (pendingShops.length > 0) {
            response.status(200).json({ message: "Pending shops found.", shops: pendingShops });
        } else {
            response.status(404).json({ message: "No pending shops found." });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const approveShop = async (request, response) => {
    try {
        const shopId = request.params.id;
        const user = await Shop.findOne({ 'shops._id': shopId });

        if (!user) {
            return response.status(404).json({ message: "Shop not found" });
        }

        const shop = user.shops.id(shopId);
        if (!shop) {
            return response.status(404).json({ message: "Shop not found within user's shops" });
        }

        shop.pending = false;
        //await shop.save();
        await user.save();

        //console.log('Updated shop:', shop);
        response.status(200).json({ message: "Shop approved successfully", shop });

    } catch (error) {
        console.error('Error approving shop:', error);
        response.status(500).json({ message: error.message });
    }
};