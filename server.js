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
        // euehqepiirawueim
        service: "Gmail",
        logger: true,
        debug: true,
        auth: {
          user: "welcometeam@erinskyekelly.com", // generated ethereal user
          pass: "euehqepiirawueim", // generated ethereal password

          // user: "welcometeam@erinskyekelly.com", // generated ethereal user
          // pass: "euehqepiirawueim", // generated ethereal password
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

      let details = {
        headers: {
          "x-priority": "1",
          "x-msmail-priority": "High",
          importance: "high"
      },
        from: 'welcometeam@erinskyekelly.com', // sender address
        // from: 'welcometeam@erinskyekelly.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Your partner wants you to take the Naked Money Meetings online quiz", // Subject line
        // text: `     Hi,
        //             Your partner invited you to attempt this quiz - bit.ly/3ERI4Sw


        //             Thank you!
        // `, // plain text body

  //       Your partner, _______, has sent you this email so you can discover your Money Block and find out the naked truth about why you are unconsciously sabotaging your ability to build wealth. 
	// CLICK HERE to get started. 

        html: `<p>Your partner, <em><b>${req.body.firstname}</b></em><br/> <br/>
                                     has sent you this email so you can discover your Money Block and find out the naked truth about why you are unconsciously sabotaging your ability to build wealth. <a href='http://ec2-15-223-72-54.ca-central-1.compute.amazonaws.com:3000/'>CLICK HERE</a> to get started. </p>`, // html body
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

