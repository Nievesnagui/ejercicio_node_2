import express, { urlencoded } from "express";
import * as dotenv from 'dotenv';


import { rutas } from "./utils/rutas.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { shopRouter } from "./routes/shopRoutes.js";
import { collections, connectToDatabase } from "./services/databaseService.js";
import { User } from "./models/User.js";

console.log('--------------------------------------------------------------');
console.log("Bienvenido a mi app");
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

connectToDatabase()
    .then(async () => {
        const user = new User('123456789', 'Pepe', 'pepemail@mail.com', { calle: 'calle', telf: '666555444', CP: '29003' });
        await user.save();
    })
    .then(() => {
        console.log('Funciona');

        app.use(urlencoded({ extended: false })); //Middleware para procesar los campos que me envíen por HTTP body-parser
        app.use(express.static(rutas.public)); //Mia rutas contenido estáticos .css .js
        app.disable('x-powered-by');
        app.set('view engine', 'ejs');
        app.set('views', rutas.views);
        app.use(
            async (req, res, next) => {
                const user = await collections.users?.findOne( { 'DNI': '123456789' } );
                req.body.user = new User(user!.DNI, user!.name, user!.mail, user!.contacto, user!.cart, user!._id.toHexString());
                next();
            }
        );

        app.use('/admin', adminRouter); //Las rutas empiezan por /admin
        app.use('/', shopRouter);
        //Controladores para responder a las peticiones por HTTP

        app.use('/', (req, res, next) => {
            console.log("Middleware del final");
            res.render('404.ejs', { pageTitle: "Págnia no encontrada", path: "" });
        })

        // FIN 
        app.listen(port);
        console.log("Servidor de la app en marcha");
        console.log(`Página disponible en: http://localhost:${port}`);

    }).catch((error) => {
        console.log(error);
    });

console.log('----- Fin del Programa -----');