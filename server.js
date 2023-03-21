const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require("./keys.json");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
let cors = require('cors');
app.use(cors());

app.post("/", async (req, res) => {
  try{
    let details;

    let blocks = {
      "The Lack Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>We determined that currently, your primary block is the Lack Block</b>.<br/><br/>
      You might sometimes feel like: I never have enough. This mentality blocks the flow of wealth to your life because you struggle with receiving.<br/><br/>
      You may also have more than one block, or there might be triggers in your life that are causing this block to be activated right now.<br/><br/>
      Know that this block has served a purpose, and it was in your life for a reason, but if you are experiencing financial frustration, it means it's time to heal and move forward.<br/><br/>
      Learning to receive is going to be key for you, as is making sure you aren't rejecting life's blessings because you are worried about being rejected yourself. Living abundantly will be a tremendous reward.<br/><br/>

      <span><b>Money blocks form because:</b></span>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Spend Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>We determined that currently, your primary block is the Spend Block</b>.<br/><br/>
      You might feel like: I can’t control my spending, or the minute I receive money I repel it and give it away.<br/><br/>
      This mentality blocks the flow of wealth to your life because you are consistently taking action that opposes financial accumulation.<br/><br/>
      It's highly likely you developed this block as a survival mechanism, or in response to something that happening when you were younger that was an emotional trigger for you. This block served it's purpose so you'll need to be careful not to have judgement for yourself (or others who have this block too!).<br/><br/>
      Healing this block will require you to interrupt some patterns that have kept you comfortable emotionally, as you might be spending in a response to emotional disregulation...especially if you haven't created any other self-soothing techniques.<br/><br/>
      The good news is, people who heal this block often go on to become incredible investors who are able to create big wealth, because you aren't afraid to risk a dollar now and then.<br/><br/>

      <span><b>Money blocks form because:</b></span>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Worthiness Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>We determined that currently, your primary block is the You have a Worthiness Block. Ugh. It sounds so harsh all typed out in bold font like this, doesn't it</b>.<br/><br/>
      You might feel like: I’m not good enough to be wealthy.<br/><br/>
      This mentality blocks the flow of wealth because we will repel blessings or opportunities or abunance if we don't feel we deserve them.<br/><br/>
      And if we don’t believe that we are deserving, then we won’t plant the seeds of success in our life today so that we can reap the harvest later.<br/><br/>
      Many people with this block will wait until they do something they feel worthy of...but unfortunately that isn't how worth works. You don't DO things to be worthy...you simply ARE worthy. Your work will be learning how to believe this and accept this as truth.<br/><br/>

      <span><b>Money blocks form because:</b>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/></span>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Intelligence and Skill Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      You have identified that you have an <b>Intelligence and/or Skill Block</b>.<br/><br/>
      The Intelligence and Skill Block shows up as: I’m not smart enough to be wealthy.<br/><br/>
      This mentality blocks the flow of wealth because you often live in the land of “When I [get a job/get a bonus/win the lottery], then I…,” meaning that, for you, money always exists only in the future.<br/><br/>
      This block also appears in a couple of ways:<br/>
      -for some people it's an avoidance of learning altogether because they hate feeling dumb<br/>
      -for other people it's a complete addiction to learning, courses, seminars but an avoidance of taking action on knowledge<br/>
      -Whichever is true for you, know this: there are a lot of really stupid rich people in the world, so anything is possible. *smirk.*<br/>

      <span><b>Money blocks form because:</b>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/></span>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Hard Work Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>Well the good news is you are a hard worker. The other news is that you have a Hard Work Block</b>.<br/><br/>
      The Hard Work Block: In order to make money, I have to work really hard. If it comes easily, it’s not worth it.<br/><br/>
      This blocks the flow of wealth because we are trading time for money, and unless we learn how to leverage that time, we will spend our one precious life exhausted and overworked.<br/><br/>
      You might not even know how to reduce your working hours because it's become an ingrained pattern in your life. Even though there might have already been consequences, like frustrations in relationships, or perhaps missing out on fun memories, you don't know another way.<br/><br/>
      Healing this block will free you up not just financially, but it will also create more free time. Wealth is less about the cash in your account, and more about the freedom to choose. The question is, when you heal this money block, what will you do with your time instead of work?<br/><br/>

      <span><b>Money blocks form because:</b>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/></span>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Stress Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>You identified that you have a Stress Block</b>.<br/><br/>
      You might often feel: Money is stressful. Finances are stressful.<br/><br/>
      This blocks the flow of wealth to our lives because we believe that money circumstances are outside of our control, and we are now at the mercy of what happens to us.<br/><br/>
      The truth is, money is not stressful. And it's not not stressful. Stress lives inside you, not money. Happiness lives inside you. Sadness lives inside you. You can choose to experience money in a whole new way if you want to.<br/><br/>

      <span><b>Money blocks form because:</b>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/></span>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Procrastination Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>Welp! It looks like you have identified a Procrastination Block</b>.<br/><br/>
      You might feel like: I am afraid of both success and failure. I delay taking action on things that bring me more income.<br/><br/>
      This blocks the flow of wealth because we are losing out on time, which is one of the most powerful factors that allows money to compound.<br/><br/>
      Healing this block isn't simply going to be about 'not procrastinating.' Have you ever tried that? It doesn't work in the long term because procrastination isn't the root of the issue. But when you can integrate how time and money work together, you can radically shift your internal motivation and create a relationship with money that feels easy and harmonious.<br/><br/>

      <span><b>Money blocks form because:</b>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/></span>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
      "The Money Guilt Block" : `<p>Hello <em><b>${req.body.firstname},</b></em><br/> <br/>
      Thank you for doing the Money Blocks Quiz. <br/> 
      <b>You are one of the kindest people on the planet. I know this because you have a Money Guilt Block</b>.<br/><br/>
      <b>It means you care deeply. And I love that about you!</b><br/><br/>
      It may also fee like: I feel guilty when I have money and other people are struggling. It feels greedy or unfair if I have money while other people are hurting financially.<br/><br/>
      But as a money block, it sabotages the flow of wealth because you likely believe that there is a finite amount of abundance. If you believe that you having makes someone else a have-not, then you are intrinsically going to repel wealth, even if you really need the money right now!<br/><br/>
      When you shift your mindset, you'll get to a place where you know that because you can be trusted with money, you can truly help more people. Being broke doesn't change the system. But you, with your incredible kind heart, can make a massive difference.<br/><br/>

      <span><b>Money blocks form because:</b>
      <li>We experience an emotional event</li>
      <li>We give it meaning</li>
      <li>And then we form a pattern by conditioning that meaning. At first, we do it to make sense of the world, or we do it for survival. But most of us end up conditioning (repeating) a pattern over and over again unconsciously that no longer serves us, and we end up feeling stuck.<br/></li><br/></span>
      
      It is possible to create new patterns by conditioning new beliefs and habits.<br/><br/>
      <b>To learn more about your block, and how to heal it, order your copy of <a href='https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1'>Naked Money Meetings,</a> today.</b><br/>
      <br/>
      <b>Forward <a href='bit.ly/3ERI4Sw'>this link</a> to a friend so they can take the quiz, too!</b>
      </p>`,
    };

    let mailContent = blocks[req.body.data[0]];

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
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

      if(req.body.result){
        details = {
          headers: {
            "x-priority": "1",
            "x-msmail-priority": "High",
            importance: "high"
        },
          from: 'welcometeam@erinskyekelly.com', // sender address
          // from: 'welcometeam@erinskyekelly.com', // sender address
          to: req.body.userEmail, // list of receivers
          subject: "Your result for the Naked Money Meetings online quiz", // Subject line

          html: mailContent, // html body
        };
      }
      else{
        details = {
          headers: {
            "x-priority": "1",
            "x-msmail-priority": "High",
            importance: "high"
        },
          from: 'welcometeam@erinskyekelly.com', // sender address
          // from: 'welcometeam@erinskyekelly.com', // sender address
          to: req.body.email, // list of receivers
          subject: "Your partner wants you to take the Naked Money Meetings online quiz", // Subject line
  
          html: `<p>Your partner, <em><b>${req.body.firstname}</b></em><br/> <br/>
                                       has sent you this email so you can discover your Money Block and find out the naked truth about why you are unconsciously sabotaging your ability to build wealth. <a href='http://ec2-15-223-72-54.ca-central-1.compute.amazonaws.com:3000/'>CLICK HERE</a> to get started. </p>`, // html body
        };
      }
      

      transporter.sendMail(details, (err) => {
        if(err) {
            res.send('error');
        }else{
            res.send('sent');
        }
      })
  } catch(err){
    console.log("Error Found -> ",err);
  }
})

app.post("/savedata", async(req, res) => {
  const data = req.body.data;
  let concatData = ``;
  const doc = new GoogleSpreadsheet("1YVr3e4V7TUtfP4p3CHDXAQf2FoIYLzykWE-CfrLBYGM");

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0];

  for(let i=0; i<data.result.length; i++){
    if(i === data.result.length-1)
      concatData += `${data.result[i]}`;
    else
      concatData += `${data.result[i]}, `;
  }

  const saveData = {
    email: data.email,
    result: concatData,
  }

  sheet.addRow(saveData);
});

app.listen(PORT, () => {
    console.log("Server Connected", PORT);
})