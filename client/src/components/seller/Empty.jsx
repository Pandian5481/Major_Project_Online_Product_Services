import { Box, Typography, styled } from "@mui/material";

const Component=styled(Box)`
  height: auto;
  width: auto;
`;

const Container=styled(Box)`
  text-align: center;
  padding-top: 100px;
`;

const Empty=()=>{

    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

    return (
        <Component>
            <Container>
                <img src={imgurl} alt="Empty" style={{width: '15%'}}/>
                <Typography>Empty!</Typography>
            </Container>
        </Component>
    );
}

export default Empty;