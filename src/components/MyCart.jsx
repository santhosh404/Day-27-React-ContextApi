import { Box, Divider, IconButton, Image, Button, Input, Card } from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext';
import CustomCorousel from './reusable/Corousel';

export default function MyCart({ product }) {

    // Context Api with custom hook
    const { products, setProducts } = useCart()

    //Out of stock state
    const [isOutOfStock, setIsOutOfStock] = useState(false)

    const handleDelete = (item) => {
        const filtered = products.filter(product => product.id !== item.id)
        setProducts(filtered)
    }

    //Function to handle decrease product quantity
    const handleDecrement = (id, quantity) => {
        setProducts(prev => {
            return prev.map(product => {
                if (product.id === id) {
                    if (product.quantity > 1) {
                        setIsOutOfStock(false);
                        return { ...product, quantity: (quantity - 1) };
                    }

                }
                return product;
            })
        })
    }

    //Function to handle increase product quantity
    const handleIncrement = (id, quantity) => {
        setProducts(prev => {
            return prev.map(product => {
                if (product.id === id) {
                    if (product.stock > quantity) {
                        return { ...product, quantity: (quantity + 1) };

                    }
                    else {
                        setIsOutOfStock(true)
                    }
                }
                return product;
            })
        })
    }


    return (
        <>
            <Card className='my-5 p-14 productCard'>
                <div className='flex flex-col justify-center'>
                    <div className='flex justify-between flex-wrap'>
                        <div className='flex flex-wrap'>
                            <CustomCorousel
                                imageName={product.title}
                                images={product.images}
                            />
                            <div className='flex flex-col gap-10'>
                                <h3 className='font-bold text-3xl product-title'>{product.title}</h3>
                                <div className='flex flex-col gap-5'>
                                    <small className='text-gray-800 font-bold text-lg'>Details & Care</small>
                                    <small className='text-gray-400 description font-bold text-lg w-[250px] md:w-[300px]'>{product.description}</small>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div className='flex gap-5 items-center'>
                                <IconButton
                                    aria-label="Decrease quantity"
                                    icon={<FaMinus />}
                                    onClick={() => handleDecrement(product.id, product.quantity || 1)}
                                    disabled={product.quantity === 1}
                                />
                                <p className='font-bold'>{product.quantity ? product.quantity : 1}</p>

                                <IconButton
                                    aria-label="Increase quantity"
                                    onClick={() => handleIncrement(product.id, product.quantity || 1)}
                                    icon={<FaPlus />}
                                    disabled={product.quantity > product.stock}
                                />
                                <p className='font-bold text-3xl'>$ {product.price * (product.quantity || 1)}</p>

                            </div>
                            {
                                isOutOfStock && <small className='text-red-500'>Product is Out of Stock</small>
                            }
                            <Button variant={"outline"} colorScheme="red" mt="4" onClick={() => handleDelete(product)} className='w-full md:w-auto'>
                                Remove
                            </Button>
                        </div>
                    </div>

                </div>

            </Card>
        </>
    )
}
