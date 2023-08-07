const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cors = require('cors')
const nodemailer = require("nodemailer");
const log = console.log;
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pathname=path.join(__dirname + "/public")

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(pathname + "/index.html"))
    res.status(200);
  })
app.get('/faq', (req, res) => {
    res.sendFile(path.join(pathname + "/FAQ.html"))
    res.status(200);
  })
app.get('/chat', (req, res) => {
    res.sendFile(path.join(pathname + "/gptPage.html"))
    res.status(200);
  })

app.get('/contact', (req, res) => {
    res.sendFile(path.join(pathname + "/contact.html"))
    res.status(200);
  })

app.post('/contactmail', (req, res) => {
  let organizationEmail = process.env.EMAIL_ID;
  let organizationPassword = process.env.EMAIL_PASSWORD;


    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: organizationEmail,
          pass: organizationPassword,
        },
      });
    
      // Structure of mail
      let mailOptions = {
        from: organizationEmail, 
        to: ` ${organizationEmail},${req.body.email}`, 
        subject: 'Contact us form response',
        html: ` <p>Name: ${req.body.name} <br> Email: ${req.body.email}<br>  Phone Number : ${req.body.phoneNumber} <br> Message: ${req.body.message} </p> <br><br><h2>We will contact you as soon as possible! Thanks for your interest!</h2>`
    };
    
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return log("Error occurs", err);
        }
        return log("Email sent!!!");
      });
      res.send({success:true,message: "Thanks for Contacting Us! We'll contact you shortly!"})
    } catch (error) {
      console.log(error)
      res.send({success:false,message: "Something went wrong!"})
    }
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(pathname + "/404.html"))
    res.status(200);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})