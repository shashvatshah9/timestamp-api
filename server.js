var express = require('express');
var app = express();
var moment = require('moment')

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static(__dirname+'public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/timestamp",function(req,res){
    var d = new Date()
    var ob = { "unix": d.getTime(), "utc":d.toUTCString() }
    res.json(ob)
})




app.get("/api/timestamp/:dateString", function(req,res){
  var date = req.params.dateString
  if(/\d{10,}$/.test(date)){
    // if a 10 digit timestamp is given
    var d=new Date(date*1000)
    res.json({unix: date*1000, utc: d.toUTCString() })
  }
  else if(moment(date, 'YYYY-MM-DD',true).isValid()){
    // if the date is in the format YYYY-MM-DD
    var d=new Date(date)
    res.json({unix: Date.parse(date), utc: d.toUTCString()})
  }
  else{
    // INVALID date format
    res.json({error: "Invalid Date"})
  }
  
})


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});