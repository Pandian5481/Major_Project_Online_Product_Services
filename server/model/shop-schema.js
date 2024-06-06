import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: String,
    detailUrl: String,
    title: String,
    price: Number,
    quantity: Number,
    description: String,
    discount: Number,
    tagline: String
});

const shopSchema = new mongoose.Schema({
    shopname: {
        type: String,
        required: true
    },
    address: String,
    pincode: Number,
    gstinno: String,
    pending: Boolean,
    products: [productsSchema]
});

const UserShopSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    shops: [shopSchema]
});

const Shop = mongoose.model('shop', UserShopSchema);

export default Shop;