import { ObjectId } from "mongodb";
import { Product } from "./Product.js";
import { User } from "./User.js";

export interface OrderItem {
    product: Product,
    qty: number
}

export interface Order {
    date: Date,
    user: User,
    items: OrderItem[]
}

/*Así es como se va a guardar en la bbdd el json
'items.product._id'
{
    date: "2024-02-07",
    user: {
        _id: 'asdadd'
        name: 'Pepe',
        mail: 'correo@mail.es'
        ...
    }
    items: [
       {
        product: {
            _id: 'dads',
            title: 'Libro',
            price: '2'
            ...
        },
        qty: 1
        }
    ]
}
*/