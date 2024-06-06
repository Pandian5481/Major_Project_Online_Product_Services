import { useState, useEffect, useContext } from 'react';
import { Dialog, Box, TextField, Typography, Button, styled } from '@mui/material';
import { authenticateSignup, authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Image = styled(Box)`
  background: #1EB88D url(https://png.pngtree.com/png-vector/20230906/ourmid/pngtree-shopping-ecommerce-easy-vector-png-image_10015617.png) center 85% no-repeat;
  height: 90%;
  width: 30%;
  padding: 45px 35px;
  & > p, & > h5 {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  & > div, & > button, & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #FB6418;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #1EB88D;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #1EB88D;
  font-weight: 600;
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const accountInitialValues = {
  login: {
    view: 'login',
    heading: "Login",
    subHeading: "Get access to your orders"
  },
  signup: {
    view: 'signup',
    heading: "Looks like you are new here!",
    subHeading: "Signup with your mobile number"
  }
};

const signupInitialValues = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  aadhar: '',
  phone: ''
};

const loginInitialValues = {
  username: '',
  password: ''
};

const LoginDialog = ({ open, setOpen, onLoginSuccess }) => {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    let username = localStorage.getItem('userName');
    if (username) {
      //Navigate('/');
      setAccount(username);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (!response) return;
    handleClose();
    setAccount(signup.username);
    localStorage.setItem("userName", signup.username);
    navigate('/');
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    if (response.status === 200) {
      handleClose();
      setAccount(response.data.data.username);
      localStorage.setItem("userName", response.data.data.username);
      onLoginSuccess(response.data); // Pass the login response to the parent component
      navigate('/');
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
      <Component>
        <Box style={{ display: 'flex', height: '100%' }}>
          <Image>
            <Typography variant='h5'>{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
          </Image>
          {account.view === 'login' ? (
            <Wrapper>
              <TextField variant="standard" onChange={(e) => onValueChange(e)} name='username' label="Enter Username" />
              {error && <Error>Please enter valid username and password</Error>}
              <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' label="Enter Password" />
              <Text>By continuing, you agree to terms and policies</Text>
              <LoginButton onClick={loginUser}>Login</LoginButton>
              <Typography style={{ textAlign: 'center' }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={toggleSignup}>New user? Create an account</CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label="Firstname" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label="Lastname" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Username" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label="Email" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Password" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='aadhar' label="Aadhar Card Number" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label="Mobile Number" />
              <LoginButton onClick={signupUser}>SignUp</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
