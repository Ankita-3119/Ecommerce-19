const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const data = require('../data/products.json')
const User = require('../model/user')
const db = 'mongodb+srv://ankita_12:ankita123@cluster0.0csxp.mongodb.net/angular?retryWrites=true&w=majority'
mongoose.connect(db, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connect');
    }
})

router.get('/products', (req, res) => {
    res.send(data);
})

// http://localhost:5000/api/products/1
router.get('/products/:id' , (req,res)=>{
    console.log(req.params.id);
    let item = data.products.filter((element)=>element.id === parseInt(req.params.id))
    console.log(item);
    res.send(item)
})

router.post('/signup', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        console.log(user)
        if (user) {
            res.status(401).send('Email Already Present')
        } else {
            console.log(userData)
            let user = new User(userData);
            user.save((err, result) => {
                if (err) {
                    console.log(err)
                }
                if (result) {
                    async function main() {
                        // Generate test SMTP service account from ethereal.email
                        // Only needed if you don't have a real mail account for testing
                        // let testAccount = await nodemailer.createTestAccount();
                      
                       // create reusable transporter object using the default SMTP transport
                       let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                          user: 'choudhary.ankita520@gmail.com', // generated ethereal user
                          pass: '9831599196', // generated ethereal password
                        },
                      });
                      
                        // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: '"E-com👻" <>', // sender address
                            to: result.email, // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: "<b>Thank </b>", // html body
                          });
                        console.log("Message sent: %s", info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                      
                        // Preview only available when sending through an Ethereal account
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                      }
                      
                      main().catch(console.error);
                    
                    
                    res.status(200).send({result});
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        }
        console.log(user);
        if (!user) {
            res.status(401).send('Invalid email');
        } else {
            if (user.password !== userData.password) {
                res.status(401).send('Password incorect')
            } else {
                let payload = {subject:user._id }
                let token = jwt.sign(payload , 'secretKey')
                res.status(200).send({token})
            }
        }
        // if(user)
    })
})

module.exports = router;