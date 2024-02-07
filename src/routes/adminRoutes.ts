import { Router } from "express";

import { getAddProduct, getEditProduct, getProducts, postAddProduct, postEditProduct, postDeleteProduct } from "../controllers/adminCtrl.js";

export const adminRouter = Router();



//todas las rutas que llegan aquí empiezan por /admin

adminRouter.get('/products',getProducts);
adminRouter.get('/add-product',getAddProduct); //Para presentar el formulario
adminRouter.post('/add-product',postAddProduct); //Para recibir los datos del formulario
adminRouter.get('/add-product/:productId', getEditProduct);
adminRouter.post('/edit-product', postEditProduct);
adminRouter.post('/delete-product', postDeleteProduct);
//añadir ruta delete
