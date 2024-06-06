import { useState, useEffect } from "react";
import { Box, Typography, styled, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import OrderedProductItem from "./OrderedProductItem";
import Empty from "./Empty";

const URL='http://localhost:8000';

const Component=styled(Box)`
  background: #FFFFFF;
  margin: 50px 300px;
`;

const MyShopHeading=styled(Typography)`
  color: #FB6418;
  text-align: center;
  padding-top: 50px; 
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const OrderedItems=styled(Box)`
  border-bottom: 1px solid #f0f0f0;
`;

const initialOrderProduct = {
    username: "",
    useraddress: "NIT Trichy-620015",
    products: []
};

const Delivery=()=>{
    const [orderedProducts, setorderedProducts] = useState(initialOrderProduct);
    const [showPopup, setShowPopup] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState("");
    const [loading, setLoading] = useState(true); // Initially set to true
    const [licenseSubmitted, setLicenseSubmitted] = useState(false); // Initially set to false

    useEffect(() => {
        const fetchOrderedProducts = async () => {
            try {
                const response = await axios.get(`https://auzm.vercel.app/getorderedproducts`);
                console.log(response.data.orderedProducts);
                setorderedProducts(response.data.orderedProducts);
            } catch (error) {
                console.error("Error fetching My Shops:", error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };
        fetchOrderedProducts();
    }, []);

    const handleSubmit = () => {
        // Here you can do whatever you want with the driving license,
        // such as sending it to the server or performing validation.
        // For this example, let's just hide the popup and set licenseSubmitted to true.
        setShowPopup(false);
        setLicenseSubmitted(true);
    };

    const handleDelivered = (productId) => {
        // Remove the item with productId from the list
        const updatedProducts = orderedProducts.filter(item => item._id !== productId);
        setorderedProducts(updatedProducts);
    };

    return (
        <Component>
            <MyShopHeading>Placed Orders ({orderedProducts.length})</MyShopHeading>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={() => setShowPopup(true)} disabled={loading || licenseSubmitted}>
                Submit Driving License
            </Button>
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                <DialogTitle>Submit Driving License</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="drivingLicense"
                        label="Driving License"
                        type="text"
                        fullWidth
                        value={drivingLicense}
                        onChange={(e) => setDrivingLicense(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPopup(false)} disabled={loading || licenseSubmitted}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading || licenseSubmitted}>Submit</Button>
                </DialogActions>
            </Dialog>
            {
                orderedProducts.length > 0 ? (
                    <>
                        {
                            orderedProducts.map(item => (
                                <OrderedItems key={item._id}>
                                    <OrderedProductItem item={item} onDelivered={handleDelivered} />
                                </OrderedItems>
                            ))
                        }
                    </>
                ) : <Empty />
            }
        </Component>
    );
};

export default Delivery;
