
import Header from './components/header/Header';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';
import Seller from './components/seller/Seller';
import Delivery from './components/delivery/Delivery';

import { Box } from '@mui/material';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Admin from './components/admin/Admin';
import Orders from './components/seller/Orders';

function App() {
  return (
    <DataProvider >
      <BrowserRouter>
        <Header/>
        <Box style={{marginTop:54}}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<DetailView/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/seller' element={<Seller/>}/>
            <Route path='/delivery' element={<Delivery/>}/>
            <Route path='/Admin' element={<Admin/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
