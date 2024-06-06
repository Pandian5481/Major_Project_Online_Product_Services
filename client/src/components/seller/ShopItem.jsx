
import { addEllipsis } from "../../utils/common-utils";
import {Box, Typography, styled} from '@mui/material';

const Component=styled(Box)`
  border-bottom: 1px solid #f0f0f0;
  margin: 20px;
  padding: 10px;
`;

const ShopName=styled(Typography)`
  font-weight: 600;
`;

const Details=styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const ShopItem=({item})=>{
    return (
        
            <Component>
                <ShopName>{item.shopname}</ShopName>
                <Details>{addEllipsis(item.address)}</Details>
                <Details>{item.pincode}</Details>
            </Component>
        
    );
}

export default ShopItem;