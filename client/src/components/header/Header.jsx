import { useState } from 'react';

import {AppBar,Toolbar,Box, IconButton, Drawer, List, styled, Typography} from '@mui/material';
import Search from './Search';
import CustomButtons from './CustomButtons';

import {Menu} from '@mui/icons-material';

import { Link } from 'react-router-dom';

import logo from './logo.png'

const StyledHeader=styled(AppBar)`
  background: #1EB88D;
  height: 55px;
`;

const LogoWrapper=styled(Link)`
  margin: 0.7% 0 0 1%;
  text-decoration: none:
`;

const CustomButtonWrapper=styled(Box)(({theme})=>({
  margin: '0 5% 0 5%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const MenuButton=styled(IconButton)(({theme})=>({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const Emergica=styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Header=()=>{
    const [open, setOpen]=useState(false);
    
    const handleOpen=()=>{
      setOpen(true);
    }

    const handleClose=()=>{
      setOpen(false);
    }

    const list=()=>(
      <Box style={{width: 250}} onClick={handleClose}>
        <List>
          <listItem button>
            <CustomButtons/>
          </listItem>
        </List>
      </Box>
    );
    
    return (
        <StyledHeader>
            <Toolbar style={{minHeight:55}}>
                <MenuButton color="inherit" onClick={handleOpen}>
                   <Menu/>
                </MenuButton>

                <Drawer open={open} onClose={handleClose}>
                  {list()}
                </Drawer>

                <Emergica to="/"><Typography style={{marginLeft: 6, width: 135, fontWeight: '600'}}>Auzm</Typography></Emergica>

                <LogoWrapper to='/'>
                    {/* <img src={logo} alt="logo" style={{width: 75}}/> */}
                    
                </LogoWrapper>
                <Search/>
                <CustomButtonWrapper>
                    <CustomButtons/>
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    );
}

export default Header;