const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
let cors = require('cors');
app.use(cors());

app.post("/", async (req, res) => {

    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // service: "Gmail",
        auth: {
          user: "arpan.sharma26@gmail.com", // generated ethereal user
          pass: "ywinqbpicsrybpgb", // generated ethereal password
        },
      });

      let details = {
        from: 'arpan.sharma26@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Test Email - Quiz Link", // Subject line
        text: `     Hi,
                    We would like you to attempt this quiz - http://http://localhost:3000


                    Thank you!
        `, // plain text body
        // html: "<b>Hello world?</b>", // html body
      };

      transporter.sendMail(details, (err) => {
        if(err) {
            console.log(err);
        }else{
            console.log("email has been sent")
        }
      })
})

app.get("/send", (req, res) => {
    res.json("test server");
})

app.listen(PORT, () => {
    console.log("Server Connected", PORT);
})

