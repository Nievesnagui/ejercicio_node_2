import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";
import { Request } from 'express';

const products: Product[] = []; //De antes de tener la bbdd

export class Product {
    public _id?: ObjectId;

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: number
    ) {
        if(id) this._id = new ObjectId(id);
    }
    
    async save() {
        if (this._id) {
            const result = await collections.products?.updateOne({ _id: this._id }, { $set: this });
            result
                ? console.log(`Id del producto actualizado ${this._id}`)
                : console.log("No se ha podido crear el producto");
            return;
        } else {
            const result = await collections.products?.insertOne(this);
            result
                ? console.log(`Id del producto creado ${result.insertedId}`)
                : console.log("No se ha podido crear el producto");
        }

        // if (!this.id) {
        //     this.id = Math.round(Math.random() * 1000000);
        //     products.push(this);
        // } else {
        //     const index = products.findIndex(p => p.id === this.id);
        //     if(this.id>=0){
        //         products[index]=this;
        //     }
        // }
    };

    static async fetchAll() {
        return await collections.products?.find().toArray();
    };
    static async findById(productId: string) {
        return await collections.products?.findOne({ _id: new ObjectId(productId) });
        // return products.find(p => p.id === productId);
    };

    //poner forma de eliminar producto
    static async deleteById(productId: string) {
       return await collections.products?.deleteOne({_id: new ObjectId(productId)});
       // const index = products.findIndex(p => p.id === productId);
        //products.splice(index, 1);
    }
}