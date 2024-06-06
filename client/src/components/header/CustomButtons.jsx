import { useState, useContext } from "react";
import { Box, Button, Typography, Badge, styled } from "@mui/material";
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginDialog from "../login/LoginDialog";
import { DataContext } from '../../context/DataProvider';
import Profile from "./Profile";
import CartItem from "../cart/CartItem";

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: '0 3% 0 auto',
  '& > *': {
    marginRight: '40px !important',
    fontSize: 16,
    alignItems: 'center',
  },
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  color: 'inherit',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const LoginButton = styled(Button)`
  color: #1EB88D;
  background: #fff;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
`;

const SellerButton = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const DeliveryButton = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CustomButtons = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const { cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const openDialog = () => {
    setOpen(true);
  }

  const handleLoginSuccess = (loginResponse) => {
    setAccount(loginResponse.data.username);
    setOpen(false);
    if (loginResponse.data.username === 'admin123' && loginResponse.data.password === '12345') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  }

  return (
    <Wrapper>
      {
        account ? <Profile account={account} setAccount={setAccount} /> :
          <LoginButton variant="contained" onClick={openDialog}>Login</LoginButton>
      }

      <SellerButton to='/seller'>
        <Typography style={{ marginTop: 3, width: 135 }}>Become a seller</Typography>
      </SellerButton>
      <DeliveryButton to='/delivery'>
        <Typography style={{ marginTop: 3, width: 135 }}>Deliver product</Typography>
      </DeliveryButton>
      <Typography style={{ marginTop: 3, width: 135 }}>More</Typography>

      <Container to='/cart'>
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} onLoginSuccess={handleLoginSuccess} />
    </Wrapper>
  );
}

export default CustomButtons;
