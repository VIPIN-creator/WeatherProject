const express = require("express");
const bodyParser = require("body-parser"); // this is important if we are using post
const app = express();
const https = require("https"); // it is an internal package

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName; // the name of input is taken here to fetch that input
  const unit ="metric";
  const apiKey = "e0faafdac93967be9948dc90a0be08b8#";

  const url =" https://api.openweathermap.org/data/2.5/weather?q=" +query+"&units="+unit+"&APPID="+apiKey+"";
  https.get(url, function(response) {

      response.on("data", function(data) {
        const weatherData = JSON.parse(data); // data is in text format that's why we are using JSON parse
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imgURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  const description= weatherData.weather[0].description;
  res.write("<p>The weather description is " + description + "</p>")
        res.write("<h1> The temperature is  " + temp + "degress celcius</h1>");
        res.write("<img src=" +imgURl+ " alt=image>"); // PAY ATTENTION !! how image is passed
        // res.send();
      })
    })
});

app.listen(3000, function() {  // there is no res, req in listen
  console.log("Server is using port 3000");
})
