import { Box, Divider, IconButton, Image, Button, Input, Card, useColorMode } from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext';
import CustomCorousel from './reusable/Corousel';
import { Rating } from 'react-simple-star-rating'

export default function MyCart({ product }) {

    // Context Api with custom hook
    const { products, setProducts } = useCart();
    const [discountInfo, setDiscountInfo] = useState({
        discountPrice: 0,
        actualPrice: 0
    });

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

    //Calculating the discount percentage and original price
    useEffect(() => {

        const actualPrice = (product.quantity || 1) * product.price + (((product.quantity || 1) * product.price) * (product.discountPercentage / 100))
        setDiscountInfo({
            discountPrice: product.price,
            actualPrice: actualPrice.toFixed(2)
        })

    }, [product])

    //Getting the color mode
    const { colorMode } = useColorMode();


    return (
        <>
            <Card className='my-5 p-14 productCard'>
                <div className='flex flex-col justify-center'>
                    <div className='w-full flex justify-center md:justify-between flex-wrap gap-5 md:gap-0'>
                        <div className='flex justify-center md:justify-start flex-wrap gap-10'>
                            <CustomCorousel
                                imageName={product.title}
                                images={product.images}
                            />
                            <div className='flex flex-col gap-10 '>
                                <div>
                                    <h3 className='font-bold text-3xl product-title'>{product.title}</h3>
                                    <p className='text-xl mt-2'>{product.stock < 5 && <small className='text-red-500'>* Only {product.stock} pieces left </small>}</p>
                                </div>

                                <div className='flex flex-col gap-5'>
                                    <small className={`${colorMode === 'dark' ? 'text-gray-400' : 'text-gray-800'} font-bold text-lg`}>Details & Care</small>
                                    <small className='text-gray-400 description font-bold text-lg w-[250px] md:w-[300px]'>{product.description}</small>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div className='flex-col md:flex-row flex justify-center items-center  gap-10 md:gap-5'>
                                <div className='flex flex-col gap-14 items-center'>
                                    <div className='flex justify-center items-center flex-wrap gap-5'>
                                        <p className='font-bold text-3xl'>$ {product.price * (product.quantity || 1)}</p>
                                        <div>
                                            <p className='line-through font-bold'>$ {discountInfo.actualPrice}</p>
                                            <small className='font-bold'>({product.discountPercentage} % OFF)</small>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-5'>
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
                                        {
                                            isOutOfStock && <small className='text-red-500'>* Product is Out of Stock</small>
                                        }
                                    </div>

                                </div>


                            </div>

                            <Button variant={"outline"} colorScheme="red" mt="4" onClick={() => handleDelete(product)} className='w-full md:w-auto removeBtn'>
                                Remove
                            </Button>
                        </div>
                    </div>

                </div>

            </Card>
        </>
    )
}
