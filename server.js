const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
let cors = require('cors');
app.use(cors());

app.post("/", async (req, res) => {
    let transporter = nodemailer.createTransport({
        // host: "smtp.coby.ns.cloudflare.com",
        // port: 2525,
        // secure: true, //true for 465, false for other ports
        service: "Gmail",
        logger: true,
        debug: true,
        auth: {
          user: "welcometeam@erinskyekelly.com", // generated ethereal user
          pass: "euehqepiirawueim", // generated ethereal password
        },
        // tls: {
        //   // do not fail on invalid certs
        //   rejectUnauthorized: false,
        // },
      });

      let details = {
        from: 'welcometeam@erinskyekelly.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Test Email - Quiz Link", // Subject line
        text: `     Hi,
                    Your partner invited you to attempt this quiz - bit.ly/3ERI4Sw


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

