import express from "express";
import { urlencoded, Router } from "express";
const router = Router();
router.use(urlencoded({ extended: false }));
router.use(express.json());

router.post("/", async(req,res) => {
    let nodemailer = require('nodemailer')
    let transporter1 = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "satyug@satyug.life" , 
            pass: process.env.EMAIL_PASSWORD 
        }
    });
    let mailOptions1 = {
        from: 'satyug@satyug.life', 
        to: req.body.email, 
        subject: 'Join Now form response',
        html: `<h2> Thanks for your interest!</h2>   <p>Name: ${req.body['name']} <br> Email: ${req.body.email}<br>  Phone Number: ${req.body.phone} <br> Message: ${req.body.message}
        <h2>We'll contact you ASAP!</h2> `
    };
    try {
        transporter1.sendMail(mailOptions1);
        res.redirect('/')
    } catch (error) {
        res.status(500).send({status:false, msg:"Internal Server Error"})
    }
});

export default router;