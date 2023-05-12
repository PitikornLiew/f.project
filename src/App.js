import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom"
import { HiUserGroup } from "react-icons/hi";
import Head from "./Chachaphong/header/Head"
import Header from "./Chachaphong/header/Header"
import LoginAdmin from "./Metha/loginAdmin";
import Pages from "./Chachaphong/pages/Pages"
import Data from "./Chachaphong/Data"
import Cart from "./Chachaphong/Cart/Cart"
import Sdata from "./Chachaphong/shops/Sdata"
import Footer from "./Chachaphong/footer/Footer"
import Register from "./Metha/register"
import MainTypeproduct from "./Metha/fashionFiles";
import Login from "./Chirot/Login";
import UserUpdate from "./Chirot/UserUpdate";
import UserCreate from "./Chirot/UserCreate";
import UsersProducts from "./Chirot/UsersProducts";
import ProductsCreate from "./Chirot/ProductsCreate";
import ProductsUpdate from "./Chirot/ProductsUpdate";
import Users from './Chirot/Users';
import AllProduct from "./Jitima/AllProduct"
import Payment from "./Metha/payment"
import ProductType from "./Metha/eachPro";
import Topbutton from "./Chachaphong/MainPage/Topbutton/Topbutton";
import Contactbutton from "./Chachaphong/MainPage/Contact/contactbutton"
import Community from "./Chachaphong/MainPage/community/Community";
import Official from "./Chachaphong/MainPage/community/official";
import Reviews from "./Chachaphong/MainPage/community/reviews";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";


//////Metha
function App() {

  const [value, setValue] = React.useState(0);
  const { productItems } = Data
  const { shopItems } = Sdata
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [CartItem, setCartItem] = useState([])

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (product) => {

    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
      <Head />
      
{/* ส่วนของ Navigation Bar */}
<AppBar position="sticky">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered >
            <Tab component={Link} to="/community" label="community" />
            <Tab component={Link} to="/official" label="official" />
            <Tab component={Link} to="/reviews" label="reviews" />
          </Tabs>
        </Box>
      </AppBar>

      <Router>
        {/* <Header CartItem={CartItem} /> */}
        <Switch>
          <Route >
            <Topbutton />
            
            <Route>
            <Route path='/community' >
                <Community />
              </Route>
              <Route path='/official' >
                <Official />
              </Route>
              <Route path='/reviews' >
                <Reviews />
              </Route>
              <Route path='/Allpro' exact>
                <AllProduct />
              </Route>
              <Route path='/login' >
                <Login />
              </Route>
              <Route path='/' exact>
                <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
              </Route>
              <Route path='/register' >
                <Register productType="mom_and_kids" />
              </Route>
              <Route path='/admin'>
                <Users />
              </Route>
              <Route path="/mainType/IT_and_computer" >
                <MainTypeproduct productType="IT_and_computer" />
              </Route>
              <Route path="/mainType/pet">
                <MainTypeproduct productType="pet" />
              </Route>
              <Route path="/mainType/beauty">
                <MainTypeproduct productType="beauty" />
              </Route>
              <Route path="/mainType/electronic" >
                <MainTypeproduct productType="electronic" />
              </Route>
              <Route path="/mainType/mom_and_kids" >
                <MainTypeproduct productType="mom_and_kids" />
              </Route>
              <Route path="/mainType/HnG" >
                <MainTypeproduct productType="HnG" />
              </Route>
              <Route path="/mainType/fashionW" >
                <MainTypeproduct productType="fashionW" />
              </Route>
              <Route path="/mainType/fashionM" >
                <MainTypeproduct productType="fashionM" />
              </Route>
              <Route path="/mainType/book_and_office">
                <MainTypeproduct productType="book_and_office" />
              </Route>
              <Route path="/mainType/SME_product" >
                <MainTypeproduct productType="SME_product" />
              </Route>
              <Route path="/mainType/healthy" >
                <MainTypeproduct productType="healthy" />
              </Route>
              <Route path="/login!" >
                <LoginAdmin />
              </Route>
              <Route path="/Products" >
                <UsersProducts />
              </Route>
              <Route path="/productsU/:id" >
                <ProductsUpdate />
              </Route>
              <Route path="/productsC" >
                <ProductsCreate />
              </Route>
              <Route path="/update/:id" >
                <UserUpdate />
              </Route>
              <Route path="/create" >
                <UserCreate />
              </Route>
              <Route path="/produc/:id" >
                <ProductType CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
              </Route>
              <Route path='/cart' exact>
                <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
              </Route>
              </Route>
              <Route >
              <Contactbutton />
              <Route path="/payments" >
                <Payment />
              </Route>
              <Route path="/Community" >
                <Community />
              </Route>
              <Link to="/Community">
              <button class="cssbuttons-io">
                <span><HiUserGroup className="group-icon" /></span>
  
</button>
              </Link>
            </Route>
          </Route>
        </Switch>
      </Router>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  )
}

export default App