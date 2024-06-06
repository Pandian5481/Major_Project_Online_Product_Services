import { useEffect, useState } from "react";
import { Box, Typography, Button, styled, Grid } from '@mui/material';
import axios from "axios";

const URL = 'http://localhost:8000';

const Component = styled(Grid)`
  display: flex;
  margin: 70px 10px;
  background: #FFFFFF;
  overflow-x: hidden; /* Prevent horizontal scroll */
  justify-content: center; /* Center the content */
  max-width: 99%; /* Ensure the width does not exceed the screen width */
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  min-height: 60vh;
  max-width: 90vw; /* Ensure the width does not exceed the viewport width */
  padding: 20px 35px;
  flex: 1;
  box-sizing: border-box; /* Include padding in the element's total width and height */
  & > div, & > button, & > p {
    margin-top: 20px;
  }
`;

const PendingShopHeading = styled(Typography)`
  color: #FB6418;
  text-align: center;
  padding-top: 5px; 
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const AdminHeading = styled(Typography)`
  text-align: center;
  padding-top: 5px; 
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const ApproveButton = styled(Button)`
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
`;

const ShopDetails = styled(Box)`
  border: 1px solid #f0f0f0;
  padding: 15px;
  margin-bottom: 10px;
`;

const Admin = () => {
  const [pendingShops, setPendingShops] = useState([]);

  useEffect(() => {
    const fetchPendingShops = async () => {
      try {
        const response = await axios.get(`${URL}/allpendingshops`);
        const flattenedShops = response.data.shops.flatMap(shopData => shopData.shops);        
        setPendingShops(flattenedShops);
      } catch (error) {
        console.error("Error fetching Pending Shops:", error);
      }
    };
    fetchPendingShops();
  }, []);

  const approveShop = async (shopId) => {
    try {
      await axios.put(`${URL}/approveShop/${shopId}`);
      setPendingShops(prevShops => prevShops.filter(shop => shop._id !== shopId));
    } catch (error) {
      console.error("Error approving shop:", error);
    }
  };

  return (
    <Component container>
      <Wrapper>
        <AdminHeading>Admin Page</AdminHeading>
        <PendingShopHeading>Pending Shops ({pendingShops.length})</PendingShopHeading>
        {pendingShops.length > 0 ? (
          pendingShops.map(item => (
            <ShopDetails key={item._id}>
              <Typography><strong>Shop Name:</strong> {item.shopname}</Typography>
              <Typography><strong>Address:</strong> {item.address}</Typography>
              <Typography><strong>Pincode:</strong> {item.pincode}</Typography>
              <Typography><strong>GSTIN No:</strong> {item.gstinno}</Typography>
              <ApproveButton variant="contained" color="primary" onClick={() => approveShop(item._id)}>Approve</ApproveButton>
            </ShopDetails>
          ))
        ) : (
          <Typography>No pending shops</Typography>
        )}
      </Wrapper>
    </Component>
  );
}

export default Admin;
