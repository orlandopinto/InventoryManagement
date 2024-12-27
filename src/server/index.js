const express = require('express');
//const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
//const { hostname } = require('os');
//const sgMail = require('@sendgrid/mail')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:5173';
app.use(cors({
     origin: [corsOrigin],
     methods: ['GET', 'POST'],
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
app.post('/image-upload', imageUpload.array("img"), (req, res) => {
     console.log('POST request received to /image-upload.');
     console.log('Axios POST body: ', req.body);
     res.send('POST request recieved on server to /image-upload.');
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