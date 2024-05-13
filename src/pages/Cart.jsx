import React, { useEffect } from 'react'
import MyCart from '../components/MyCart';
import { Card, Container, Divider, Tooltip, useColorMode } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Cart() {

  //Context from custom hook
  const { products } = useCart()

  //Calculate the subTotal / total
  const subTotal = products.reduce((acc, current) => acc + current.price * (current.quantity || 1), 0);

  //Getting the color mode
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container maxW={"1200px"} className='p-10'>

        {/* Header Section */}
        <div className='flex items-center gap-5 justify-center md:justify-start'>
          <h1 className='yourCart'>Your Cart ({products.length})</h1>
          {

            colorMode === "dark" ? <Tooltip label={"Light Mode"}><SunIcon onClick={toggleColorMode} className='text-2xl cursor-pointer icon-font' /></Tooltip> :
              <Tooltip label={"Dark Mode"}><MoonIcon onClick={toggleColorMode} className='text-2xl cursor-pointer icon-font' /></Tooltip>

          }
        </div>

        {/* Products List Section */}
        {
          products.length === 0 ? <p className='my-5 text-center'>No products in the cart</p> :
            products.map((cartProduct) => (
              <MyCart
                key={cartProduct.id}
                product={cartProduct}
              />
            ))
        }

        {/* SubTotal or Summary Section */}
        <Card className='subTotalCard' >
          <div className='flex justify-between items-center p-2'>
            <p className='font-bold'>SUBTOTAL: </p>
            <p className='font-bold'>$ {subTotal}</p>
          </div>
          <div className='flex justify-between  items-center p-2'>
            <p className='font-bold'>SHIPPING: </p>
            <p className='font-bold'>FREE</p>
          </div>
          <Divider mt="4" />
          <div className='flex justify-between items-center p-2'>
            <p className='font-bold'>TOTAL: </p>
            <p className='font-bold'>$ {subTotal}</p>
          </div>
        </Card>

      </Container>

    </>
  )
}
