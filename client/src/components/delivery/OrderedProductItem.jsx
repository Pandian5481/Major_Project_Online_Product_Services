
import {Box, Button, Typography, styled} from '@mui/material';
import { useState, useEffect } from 'react';

import { addEllipsis } from '../../utils/common-utils';
import Empty from './Empty';
import axios from 'axios';

const URL = 'http://localhost:8000';

const Component=styled(Box)`
  margin: 20px;
  padding: 10px;
`;

const UserName=styled(Typography)`
  font-weight: 600;
`;

const Details=styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const ProductComponent=styled(Box)`
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  background: #fff;
`;

const LeftComponent=styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const SmallText=styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const DeliverButton=styled(Button)`
  text-transform: none;
  background: #FB6418;
  color: #fff;
  border-radius: 2px;
  float: right;
`;

const BottomComponent=styled(Box)`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

const OrderedProductItem=({ item, onDelivered })=>{

  const [price, setPrice]=useState(0);
  const [discount,setDiscount]=useState(0);
  const [delivered, setDelivered] = useState(false);

    useEffect(()=>{
        totalAmount();
    },[]);

    const totalAmount=()=>{
        let price=0, discount=0;
        item.products.map(product=>{
            price += product.price.mrp;
            discount += (product.price.mrp-product.price.cost);
        });
        setPrice(price);
        setDiscount(discount);
    }
    const handleDeliveredClick = async() => {
      try {
        const response = await axios.post(`${URL}/deletefromorederedproducts`, { productId: item._id });
        if (response.status === 200) {
            console.log('Item deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
      onDelivered(item._id);
    };

    const handleDeliverClick = () => {
      setDelivered(true);
    };

    return (
        
            <Component>
                <UserName>{item.username}</UserName>
                <Details>{item.useraddress}</Details>   
                      <Box>
                        {
                          item.products.map(productsData=>(
                          <ProductComponent>
                            <LeftComponent>
                                <img src={productsData.url} alt="product" style={{height: 110, width: 110}}/>
                            </LeftComponent>
                            <Box style={{margin: 20}}>
                                <Typography>{addEllipsis(productsData.title.longTitle)}</Typography>
                                <SmallText>Seller: DetailNet</SmallText>
                                <Typography style={{margin: '20px 0'}}>
                                    <Box component="span" style={{fontWeight: 600, fontSize: 18}}>₹{productsData.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                                    <Box component="span" style={{color: '#878787'}}><strike>₹{productsData.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                                    <Box component="span" style={{color: '#388E3C'}}>{productsData.price.discount}</Box>
                                </Typography>
                                <Typography>Quantity: {productsData.quantity}</Typography>
                            </Box>
                          </ProductComponent>
                          ))
                        }
                        <BottomComponent>
                          <Typography>Total: <Box component="span" fontWeight="bold">₹{price-discount+40}</Box></Typography> &nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <DeliverButton onClick={() => handleDeliveredClick(item._id)}>Delivered</DeliverButton>
                          <DeliverButton disabled={delivered} onClick={handleDeliverClick}>Deliver</DeliverButton>
                        </BottomComponent> 
                      </Box>                            
                      
                              
            </Component>
        
    );
}

export default OrderedProductItem;