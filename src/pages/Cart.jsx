import React, { useEffect } from 'react'
import MyCart from '../components/MyCart';
import { Card, Container, Divider } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {

  const { products } = useCart()

  const subTotal = products.reduce((acc, current) => acc + current.price * (current.quantity || 1), 0);


  return (
    <>
      <Container maxW={"1000px"} className='p-10'>
        <h1 className='yourCart'>Your Cart ({products.length})</h1>
        {
          products.length === 0 ? <p className='my-5 text-center'>No products in the cart</p> :
            products.map((cartProduct) => (
              <MyCart
                key={cartProduct.id}
                product={cartProduct}
              />
            ))
        }
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
