import OrderedProduct from "../model/orderedproduct-schema.js";
import OrderedShop from "../model/ordershop-schema.js";

export const getOrderedShopProducts = async (request, response) => {
    try {
        //console.log(email);
        let orderedProducts = await OrderedShop.find({});
        if (orderedProducts) {
            response.status(200).json({ message: "Ordered products found.",  orderedProducts});
        } else {
            response.status(401).json({ message: "Empty" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getOrderedProducts = async (request, response) => {
    try {
        //console.log(email);
        let orderedProducts = await OrderedProduct.find({});
       // console.log(orderedProducts);
        if (orderedProducts) {
            response.status(200).json({ message: "Ordered products found.",  orderedProducts});
        } else {
            response.status(401).json({ message: "Empty" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const postOrderedProducts = async (request, response) => {
    try {
        const username = request.body.username;
        const useraddress = request.body.useraddress;
        const shopname = request.body.shopname;
        const orderedProductData = request.body.products;
        //console.log(orderedProductData);

        const newOrderedProduct = new OrderedShop({
            username: username,
            useraddress: useraddress,
            shopname: shopname,
            products: orderedProductData
        });

        const savedOrderedProduct = await newOrderedProduct.save();
        //console.log(orderedProductData);

        response.status(200).json({ message: "Ordered product stored successfully.", orderedProduct: savedOrderedProduct });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const acceptOrderShop = async (request, response) => {
    try {
        const { productId } = request.body;

        // Find and remove the document with the specified _id from OrderedShop
        const orderedProduct = await OrderedShop.findOneAndDelete({ _id: productId });
        
        if (!orderedProduct) {
            return response.status(404).json({ message: 'Order not found' });
        }
        const newOrderedProduct = new OrderedProduct({
            username: orderedProduct.username,
            useraddress: orderedProduct.useraddress,
            shopname: orderedProduct.shopname,
            products: orderedProduct.products
        });

        // Save the new OrderedProduct document
        await newOrderedProduct.save();
       // console.log(orderedProduct); // Print the removed document
        response.status(200).json({ message: 'Order accepted and removed from the shop orders' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const deleteFromOrderedProducts = async (request, response) => {
    try {
        const { productId } = request.body;
        console.log(productId);
        // Find and remove the document with the specified _id from OrderedShop
        const orderedProduct = await OrderedProduct.findOneAndDelete({ _id: productId });
        console.log(orderedProduct);
        if (!orderedProduct) {
            return response.status(404).json({ message: 'Order not found' });
        }
       // console.log(orderedProduct); // Print the removed document
        response.status(200).json({ message: 'Order accepted and removed from the shop orders' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};