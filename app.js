const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function (req,res) {

  let cyrpto = req.body.cyrpto;
  let fiat = req.body.fiat;
  let amount = Number(req.body.amount);

  let options = {
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from:cyrpto,
      to:fiat,
      amount:amount
    }
  }


  request(options,function (error,response,body) {
    let data = JSON.parse(body);
    let price = data.price
    let currentTime = data.time
    console.log(price);
    console.log(typeof price);
    console.log(currentTime);


    // console.log(price);
    res.write(`<p>The current date is ${currentTime}</p>`)
    res.write(`<h1>The current price of ${amount} ${cyrpto} is ${price} ${fiat}</h1>`);
    res.send()

  })

})

app.listen("3000", function () {
  console.log("Server is running on port: 30000..");
})
