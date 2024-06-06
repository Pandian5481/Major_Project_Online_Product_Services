import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    url: String,
    detailUrl: String,
    shopname: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

const orderedProductsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useraddress: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    products: [productSchema]
});

const OrderedProduct = mongoose.models.OrderedProduct || mongoose.model("OrderedProduct", orderedProductsSchema);

export default OrderedProduct;