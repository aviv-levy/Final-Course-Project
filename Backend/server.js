const port = 4500;

require('dotenv').config();
const fs = require('fs')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb' }));

app.use(cors());
app.use(bodyParser.json())

const UserModel = require('./Models/userRegisterModel');
const ProductModel = require('./Models/productModel');

const verifyToken = require('./verifyToken');
const verifyAdmin = require('./verifyAdmin');

const adminRouter = require('./Routers/adminRouter.js')
const loginRouter = require('./Routers/loginRouter.js')
const registerRouter = require('./Routers/registerRouter.js')
const userRouter = require('./Routers/userRouter.js')
const productRouter = require('./Routers/productRouter.js')
const resetAccountRouter = require('./Routers/resetAccountRouter.js')
const contactUsRouter = require('./Routers/contactUsRouter.js')
const ordersRouter = require('./Routers/ordersRouter.js')


async function main() {
    await mongoose
        .connect(process.env.DATABASE)
        .then(() => {
            console.log("conected to Mongo");
        })
        .catch(() => {
            console.log("something in mongo went wrong");
        });
}

main();

app.use('/admin', verifyToken, verifyAdmin, adminRouter)
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', verifyToken, userRouter);
app.use('/products', productRouter);
app.use('/resetAccount', resetAccountRouter);
app.use('/contact', contactUsRouter);
app.use('/orders', verifyToken , ordersRouter);


//http://localhost:4500/initialize
//Initilaize Database with data
app.get('/initialize', async (req, res) => {
    try {
        let myData = JSON.parse(fs.readFileSync("./initalizeData.json").toString());

        // Insert users
        myData.users.forEach(async (user) => {
            user.password = await bcrypt.hash(user.password, 10)
            const newUser = new UserModel(user);
            await newUser.save();
        });

        //Insert products
        myData.products.forEach(async (product) => {
            const newProduct = new ProductModel(product);
            await newProduct.save();
        });

        res.status(200).send('Data initialized');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.listen(port, () => {
    console.log('Server is running...');
})
