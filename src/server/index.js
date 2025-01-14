
import process from "process";
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from "dotenv";
import fs from 'fs-extra'

dotenv.config({ path: './.env.development' });

//const nodemailer = require("nodemailer");
const app = express();
//const { hostname } = require('os');
//const sgMail = require('@sendgrid/mail')
import { uploadProductImage } from './utils/cloudinary.js'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:5173';

app.use(cors({
     origin: [corsOrigin],
     methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
     credentials: true
}));

app.use(express.json());

const imageUploadPath = '../uploaded_files';

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, imageUploadPath)
     },
     filename: function (req, file, cb) {
          cb(null, file.originalname)
     }
})

const imageUpload = multer({ storage: storage })

//EndPoint to init
app.get('/', (req, res) => {
     res.send('Server initialized!')
})

//EndPoint to upload images
app.post('/image-upload', imageUpload.array("img"), async (req, res) => {
     try {

          //console.log('POST request received to /image-upload.');
          //console.log('Axios POST body: ', req.body);
          res.send('POST request recieved on server to /image-upload.');
          //console.log('result: ', result)
     } catch (error) {
          console.log(`error:  ${error} end point: '/image-upload'`)
     }
})

app.use(fileUpload({
     useTempFiles: true,
     tempFileDir: '../uploaded_files'
}))

app.post('/upload-product-images', async (req, res) => {
     try {
          // console.log('tempFilePath: ', req.files)
          console.log('tempFilePath: ', req.files.file.tempFilePath)
          const result = await uploadProductImage(req.files.file.tempFilePath)
          //console.log('result: ', result)
          res.send(result);
          await fs.unlink(req.files.file.tempFilePath)
     } catch (error) {
          console.log(`error:  ${error} end point: '/upload-product-images'`)
     }

})


//EndPoint to send emails
//app.post("/send", (req, res) => {
// const mailOptions = {
//      from: req.body.from,
//      to: req.body.to,
//      subject: req.body.subject,
//      html: req.body.message
// };

// const transporter = nodemailer.createTransport({
//      Service: 'gmail',
//      auth: {
//           user: process.env.VITE_EMAIL,
//           pass: process.env.VITE_GMAIL_PASS,
//      },
//      port: 465,
//      secure: true, // use false for STARTTLS; true for SSL on port 465
//      host: 'smtp.gmail.com'
// })
//      .sendMail(mailOptions, (error, info) => {
//           if (error) {
//                return res.status(500).send(error);
//           }
//           res.status(200).send("Email sent successfully");
//      })
//      .verify(function (error, success) {
//           if (error) {
//                console.log(error);
//           } else {
//                console.log("Server is ready to take our messages");
//           }
//      });
//});

const port = 4000;
app.listen(port, process.env.IP, function () {
     console.log(`Server is running on port ${port}`);
});