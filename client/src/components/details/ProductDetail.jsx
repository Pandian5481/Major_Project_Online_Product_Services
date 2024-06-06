

import {Box, Table, TableBody, TableCell, TableRow, Typography, styled} from '@mui/material';
import {LocalOffer as Badge} from '@mui/icons-material';

const SmallText=styled(Box)`
  font-size: 14px;
  vertical-align: baseline;
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StyledBadge=styled(Badge)`
  margin-right: 10px;
  color: #00CC00;
  font-size: 15px;
`;

const ColumnText=styled(TableRow)`
  font-size: 14px;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
    border: none;
  }
`;

const ProductDetail=({product})=>{
    const date=new Date(new Date().getTime()+(60*60*1000));

    return (
        <>
            <Typography>{product.title.longTitle}</Typography>
            <Typography style={{marginTop: 5, color: '#878787', fontSize: 14}}>
                    8 Ratings and 1 Review
            </Typography>
            <Typography>
                <Box component="span" style={{fontSize: 28}}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{color: '#878787'}}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{color: '#388E3C'}}>{product.price.discount}</Box>
            </Typography>
            <Typography>Availbale Offer</Typography>
            <SmallText>
                <Typography><StyledBadge/>Get extra 20% off upto ₹50 on item(s) T&C</Typography>
                <Typography><StyledBadge/>Get extra 13% off T&C</Typography>
                <Typography><StyledBadge/>Bank Offer 5% Cashback on Flipkart Axis Bank CardT&C</Typography>
                <Typography><StyledBadge/>Special PriceGet extra 28% off (price inclusive of cashback/coupon)T&C</Typography>
            </SmallText>
            <Table>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{color: '#878787'}}>Delivery</TableCell>
                        <TableCell style={{fontWeight: 600}}>Delivery By {date.toLocaleTimeString()} | ₹40</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{color: '#878787'}}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{color: '#878787'}}>Seller</TableCell>
                        <TableCell>
                            <Box component="span" style={{color: '#2874f0'}}>SuperComNet</Box>
                        </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{color: '#878787'}}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>
        </>
    );
}

export default ProductDetail;