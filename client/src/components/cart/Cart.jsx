
import { Typography, Grid, Box,Button, styled } from "@mui/material";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";

import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";
import axios from "axios";
import { useState, useEffect } from "react";

const URL='http://localhost:8000';

const Container=styled(Grid)(({theme})=>({
  padding: '30px 135px',
  [theme.breakpoints.down('md')]: {
    padding: '15px 0'
  }
}));

const Header=styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const ButtonWrapper=styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton=styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  width: 250px;
  height: 51px;
  border-radius: 2px;
`;

const LeftComponent=styled(Grid)(({theme})=>({
  paddingRight: 15,
  [theme.breakpoints.down('md')]: {
    marginBottom: 15
  }
}));

const initialOrderProduct = {
  username: "",
  useraddress: "NIT Trichy-620015",
  products: []
};

const Cart=()=>{
    const { cartItems }=useSelector(state=>state.cart);
    const [orderProduct, setOrderProduct] = useState(initialOrderProduct);

    useEffect(() => {
      const storedUsername = localStorage.getItem('userName');
      if (storedUsername) {
          setOrderProduct(prevOrderProduct => ({
              ...prevOrderProduct,
              username: storedUsername
          }));
      }
  }, []); 

  const buyNow = async () => {
    const storedUsername = localStorage.getItem('userName');
    //console.log(cartItems[0].shopname);
    const orderProductData = {
      username: storedUsername,
      useraddress: "NIT Trichy-620015",
      shopname: cartItems[0].shopname,
      products: cartItems,
    };
  
    //console.log(cartItems); // This should show the cart items correctly
    //console.log(orderProductData); // This should show the order product data correctly
  
    try {
      let res = await axios.post(`${URL}/postorderedproducts`, orderProductData);
      console.log(res.data); // Check the response from the server
  
      let response = await payUsingPaytm({ amount: 500, email: 'ankit@gmail.com' });
      let information = {
        action: 'https://securegw-stage.paytm.in/order/process',
        params: response,
      };
      post(information);
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <>
          {
            cartItems.length?
              <Container container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography>My Cart ({cartItems.length})</Typography>
                    </Header>
                    {
                        cartItems.map(item=>(
                            <CartItem item={item}/>
                        ))
                    }
                    <ButtonWrapper>
                    <StyledButton onClick={buyNow}>Place Order</StyledButton>
                    </ButtonWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} orderProduct={orderProduct} setOrderProduct={setOrderProduct}/>
                </Grid>
              </Container>
              :
              <EmptyCart/>
          }
        </>
    );
}

export default Cart;