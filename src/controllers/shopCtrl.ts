import { NextFunction, Request, Response } from "express";

import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
//import { Cart } from "../models/Cart.js";
import { it } from "node:test";


export const getIndex = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/index', { pageTitle: 'Tienda', path: '/' });
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/product-list', {
        pageTitle: 'Lista Productos',
        path: '/products',
        prods: await Product.fetchAll()
    });
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
        res.render('shop/product-detail', { pageTitle: product.title, path: '', product: product });
    } else {
        res.status(404).render('404.ejs', { pageTitle: 'Producto no encontrado', path: '' });
    }
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.body.user as User;
    const items = await user.getCart();

    res.render('shop/cart', {
        pageTitle: 'Carro de la compra',
        path: '/cart',
        items: items,
    });
}

export const postCart = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.body.user;
    const productId = req.body.productId;
    await user.addToCart(productId);

    //Cart.addProduct(productId, 1);
    res.redirect('/cart');

}

export const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.body.user;
    const productId = req.body.productId;
    const result = await user.deleteCartItem(productId);

    //Cart.deleteProduct(productId);
    res.redirect('/cart');

}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const orders = await user.getOrders();
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        user: { name: user.name, DNI: user.DNI },
        orders: orders
    });

}

export const getCheckOut = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    try {
        const result = await user.addOrder();
        result
            ? console.log('Orden añadida: ', result)
            : console.log('Error en la orden');
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect('/orders')
    }

}


