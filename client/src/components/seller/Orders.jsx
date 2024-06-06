import React, { useEffect, useState } from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import axios from "axios";
import OrderedProductItem from "./OrderedProductItem";
import Empty from "./Empty";

const URL = 'http://localhost:8000';

const Component = styled(Box)`
  background: #FFFFFF;
  margin: 50px 300px;
`;

const MyShopHeading = styled(Typography)`
  color: #FB6418;
  text-align: center;
  padding-top: 50px; 
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const OrderedItems = styled(Box)`
  border-bottom: 1px solid #f0f0f0;
`;

const Orders = () => {
    const userName = localStorage.getItem('userName');
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [myShops, setMyShops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyShops = async () => {
            try {
                const responseMyShops = await axios.get(`${URL}/myshops/${userName}`);
                setMyShops(responseMyShops.data.myShopData);
                //console.log(responseMyShops.data.myShopData);
            } catch (error) {
                console.error("Error fetching My Shops:", error);
            }
        };

        const fetchOrderedProducts = async () => {
            try {
                const response = await axios.get(`${URL}/getorderedshopproducts`);
                setOrderedProducts(response.data.orderedProducts);
                //console.log(response.data.orderedProducts);
            } catch (error) {
                console.error("Error fetching Ordered Products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyShops();
        fetchOrderedProducts();
    }, [userName]);

    const acceptOrder = async (productId) => {
        console.log(productId);
        try {
            const response = await axios.post(`${URL}/acceptorder`, { productId });
            if (response.status === 200) {
                setOrderedProducts(orderedProducts.filter(item => item._id !== productId));
            }
        } catch (error) {
            console.error("Error accepting order:", error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const myShopNames = myShops.map(shop => shop.shopname);

    return (
        <Component>
            <MyShopHeading>Orders</MyShopHeading>
            {
                orderedProducts.length > 0 ? (
                    orderedProducts.filter(item => myShopNames.includes(item.shopname)).map(item => (
                        <OrderedItems key={item._id}>
                            <OrderedProductItem item={item} />
                            <Button variant="contained" color="primary" onClick={() => acceptOrder(item._id)}>
                                Accept Order
                            </Button>
                        </OrderedItems>
                    ))
                ) : <Empty />
            }
        </Component>
    );
};

export default Orders;
