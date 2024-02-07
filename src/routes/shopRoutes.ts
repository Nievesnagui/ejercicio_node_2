import { Router } from "express";
import { getIndex, getProducts, getProductById, postCart, getCart, deleteCartItem, getOrder, getCheckOut } from "../controllers/shopCtrl.js";



export const shopRouter =  Router();

//Usamos get y por lo tanto exige coincidencia "completa", no capa otras rutas
shopRouter.get('/',getIndex);
shopRouter.get('/products',getProducts);
shopRouter.get('/products/:productId',getProductById);
shopRouter.post('/add-to-cart', postCart);
shopRouter.get('/cart', getCart);
shopRouter.post('/cart-delete-item', deleteCartItem);
shopRouter.get('/orders', getOrder);
shopRouter.get('/checkout', getCheckOut);