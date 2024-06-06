import express from 'express';
import { userSingup, userLogin } from '../controller/user-controller.js';
import { getProducts, getProductById } from '../controller/product-controller.js';
import { addPaymentGateway, paytmResponse } from '../controller/payment-controller.js';
import { userShop } from '../controller/usershop-controller.js';
import { getMyShops, getPendingShops } from '../controller/usershop-controller.js';
import { getOrderedProducts, postOrderedProducts } from '../controller/orderedproduct-controller.js';
import { getAllPendingShops } from '../controller/usershop-controller.js';
import { getOrderedShopProducts } from '../controller/orderedproduct-controller.js';
import { acceptOrderShop } from '../controller/orderedproduct-controller.js';
import { approveShop } from '../controller/usershop-controller.js';
import { deleteFromOrderedProducts } from '../controller/orderedproduct-controller.js';

const router=express.Router();

router.post('/signup',userSingup);
router.post('/login',userLogin);

router.get('/products',getProducts);
router.get('/product/:id',getProductById);
router.get('/myshops/:username',getMyShops);
router.get('/pendingshops/:username',getPendingShops);
router.get('/allpendingshops',getAllPendingShops);
router.put('/approveShop/:id',approveShop);

router.get('/getorderedshopproducts',getOrderedShopProducts)
router.get('/getorderedproducts',getOrderedProducts);
router.post('/postorderedproducts',postOrderedProducts);
router.post('/acceptorder',acceptOrderShop);
router.post('/deletefromorederedproducts',deleteFromOrderedProducts);

/*router.post('/payment',addPaymentGateway);
router.post('/callback',paytmResponse);*/

router.post('/registershop',userShop);

export default router;
