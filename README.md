# React Shopping Cart

***Features***
1. Users able to increase and decrease the product quantity.
2. Based on product quantity, the product's actual price and offer price will be updated.
3. Actual price is calculated from the product's discount percentage, using below formula, <br />
     ***const actualPrice = (product.quantity || 1) * product.price + (((product.quantity || 1) * product.price) * (product.discountPercentage / 100))***
5. User can remove the product from cart.
6. There is section called total and subtotal price of all products, based on the above actions, total price or subtotal price will be updated.
7. From the UI perspective, Implemented Dark and Light Mode.


<b>Created using:</b> React.js, Chakra UI, Tailwind CSS, Context API

***Please find the deployed url below***<br/>
https://react-shoppingcart-contextapi.netlify.app
