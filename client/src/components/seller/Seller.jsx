import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, styled, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { authenticateShop } from "../../service/api";
import axios from "axios";

import ShopItem from "./ShopItem";
import Empty from "./Empty";

const URL='http://localhost:8000';

const OuterComponent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px;
  flex-direction: column;  
`;

const Component = styled(Grid)`
  display: flex;
  justify-content: center;
  margin: 10px 10px;
  position: relative; // Add position relative to contain absolute positioning
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  height: 60vh;
  width: 50vh;
  padding: 25px 35px;
  flex: 1;
  & > div, & > button, & > p {
    margin-top: 20px;
  }
`;

const RegisterButton = styled(Button)`
  text-transform: none;
  background: #FB6418;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const LeftComponent = styled(Grid)`
  background: #FFFFFF;
  height: 67vh;
  width: 60vh;
  margin-right: 10px;
`;

const RightComponent = styled(Grid)`
  background: #FFFFFF;
  height: 67vh;
  width: 60vh;
  margin-left: 10px;
`;

const MyShopHeading = styled(Typography)`
  color: #FB6418;
  text-align: center;
  padding-top: 50px; 
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const OrdersButton = styled(Button)`
  margin-top: 20px;
  text-transform: none;
  background: #1EB88D;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const Seller = () => {
    const userName = localStorage.getItem('userName');
    const navigate = useNavigate(); // Initialize useNavigate

    const [PendingShops, setPendingShops] = useState([]);
    const [MyShops, setMyShops] = useState([]);

    const [shop, setShop] = useState({
        shopname: '',
        address: '',
        pincode: '',
        gstinno: '',
        pending: true,
        username: userName, // Include user's email
        products: []
    });

    useEffect(() => {
        const fetchShops = async () => {
            try {
                setMyShops([]); // Reset MyShops to an empty array
                setPendingShops([]); // Reset PendingShops to an empty array

                const responseMyShops = await axios.get(`${URL}/myshops/${userName}`);
                setMyShops(responseMyShops.data.myShopData);
                //console.log(responseMyShops.data.myShopData);
                const responsePendingShops = await axios.get(`${URL}/pendingshops/${userName}`);
                setPendingShops(responsePendingShops.data.myShopData);
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };

        fetchShops();
    }, [userName]);

    const onInputChange = (e) => {
        setShop({ ...shop, [e.target.name]: e.target.value });
    }

    const registerShop = async () => {
        let response = await authenticateShop(shop);
        if (!response) return;
        setShop({
            shopname: '',
            address: '',
            pincode: '',
            gstinno: '',
            username: userName, // Preserve user's email
            products: []
        });
    }

    const navigateToOrders = () => {
        navigate('/orders'); // Navigate to the Orders page
    }

    return (
        
        <OuterComponent>
        <OrdersButton onClick={navigateToOrders}>Orders</OrdersButton>
        <Component container>
        
            <LeftComponent item lg={4} md={8} sm={12} xs={12}>
                <MyShopHeading>My Shops ({MyShops.length})</MyShopHeading>
                {
                    MyShops.length > 0 ? (
                        MyShops.map(item => (
                            <ShopItem key={item._id} item={item} />
                        ))
                    ) : <Empty />
                }
            </LeftComponent>

            <Wrapper item lg={4} md={8} sm={12} xs={12}>
                <Typography style={{ color: '#1EB88D', textAlign: 'center', fontWeight: '600' }}>Register New Shop</Typography>
                <TextField variant="standard" onChange={onInputChange} name='shopname' label="Shopname" value={shop.shopname || ''} />
                <TextField variant="standard" onChange={onInputChange} name='address' label="Address" value={shop.address || ''} />
                <TextField variant="standard" onChange={onInputChange} name='pincode' label="Pincode" value={shop.pincode || ''} />
                <TextField variant="standard" onChange={onInputChange} name='gstinno' label="GSTIN Number" value={shop.gstinno || ''} />
                <Text>By continuing, you agree to terms and policies</Text>
                <RegisterButton onClick={registerShop}>Register</RegisterButton>
            </Wrapper>

            <RightComponent item lg={4} md={8} sm={12} xs={12}>
                <MyShopHeading>Pending Shops ({PendingShops.length})</MyShopHeading>
                {
                    PendingShops.length > 0 ? (
                        PendingShops.map(item => (
                            <ShopItem key={item._id} item={item} />
                        ))
                    ) : <Empty />
                }
            </RightComponent>
        </Component>
        </OuterComponent>
    );
}

export default Seller;
