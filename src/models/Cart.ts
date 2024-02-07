
/*export class CartItem {
    constructor(
        public id: number, //id del producto del carro
        public qty: number //cantidad de veces que se compra el producto
    ) {
    }
}

const cartItems: CartItem[] = [];

export class Cart {
    static addProduct(id: number, qty: number) //introducir un producto
    {
        const index = cartItems.findIndex(ci => ci.id === id);
        if (index >= 0) {
            cartItems[index] = new CartItem(id, cartItems[index].qty+qty);
        } else {
            cartItems.push(new CartItem(id, qty));
        }

    }
    static getCart(){
        return cartItems;
    }

    static deleteProduct(id: number){
        const index = cartItems.findIndex(ci => ci.id === id);
        if(index >= 0){
            cartItems.splice(index, 1);
        }
    }

}*/

