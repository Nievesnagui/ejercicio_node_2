import { Request, Response, NextFunction } from "express";

import { Product } from "../models/Product.js";


export const getProducts = async (req: Request, res: Response) => {
    res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        prods: await Product.fetchAll()
    });
};

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
    console.log("Devolvemos el formulario para meter productos");
    res.render('admin/edit-product', { pageTitle: "Formulario", path: "/admin/add-product", editing: false });
}
export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    console.log(description);
    const price = +req.body.price;
    if (req.body.title) {
        console.log('Ha llegado el siguiente producto: ', req.body.title);
        const producto = new Product(
            title,
            imageUrl,
            description,
            price
        );
        await producto.save();
    }
    console.log('pasa')
    res.redirect('/products');
};
export const getEditProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getEditProduct: Devolvemos el formulario para editar productos");
    const editMode = req.query.edit === 'true';
    if (!editMode) {
        return res.redirect('/products');
    }
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
        res.render('admin/edit-product',
            {
                pageTitle: "Formulario",
                path: "/admin/add-product", //Entrada de la barra de navegación a sombrear
                editing: editMode,
                product: product
            });
    } else {
        res.redirect('/products');
    }



}

export const postEditProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log("postEditProduct");
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = +req.body.price;
    const product = new Product(title, imageUrl, description, price, productId);
    console.log(product);
    await product.save();

    res.redirect('/admin/products')

}

//funcion delete
export const postDeleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.body.productId;

    Product.deleteById(productId);

    res.redirect('/admin/products')

}