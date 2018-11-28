
//Initialize Firebase
var config = {
    apiKey: "AIzaSyAtN6taEvCRsxVNUg9EUT7-MYFpvGaS0gU",
    authDomain: "ship-efce3.firebaseapp.com",
    databaseURL: "https://ship-efce3.firebaseio.com",
    projectId: "ship-efce3",
    storageBucket: "ship-efce3.appspot.com",
};

firebase.initializeApp(config);
var database=firebase.database();

//Button for add Ship name

$("#add-ship-btn").on("click",function(event){
event.preventDefault();

//Grabs user input

var shipName=$("#ship-name-input").val().trim();
var shipDestination=$("#destination-input").val().trim();
var shipFrequency=$("#frequency-input").val().trim();
var shipFirstTime=$("#first-ship-time-input").val().trim();

//creats local "temporary"object for holding input

var newShip={
  name: shipName,
  destination: shipDestination,
  frequency: shipFrequency,
  firstTime: shipFirstTime
};

//upload ship time to the database
console.log(newShip.name);
console.log(newShip.destination);
console.log(newShip.frequency);
console.log(newShip.firstTime);

database.ref().push(newShip);

//alert("Ship successfully added");
//clears all of the text-boxes
$("ship-name-input").val("");
$("destination-input").val("");
$("frequency-input").val("");
$("first-ship-time-input").val("");
});

//creat firebse event for adding ship to the database and a row in the html when user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

var shipName=childSnapshot.val().name;
var shipDestination=childSnapshot.val().destination;
var shipFrequency=childSnapshot.val().frequency;
var shipFirstTime=childSnapshot.val().firstTime;

//alert("ShipTime before format: "+shipFirstTime);

var shipFirstConverted = moment(shipFirstTime,"hh:mm").subtract(1,"years");
var currentTime = moment();

console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
var tFrequency=shipFrequency;
console.log(tFrequency);
//Difference between the times
var diffTime=moment().diff(moment(shipFirstConverted),"minutes");
//console.log("DIFFERENCE IN TIME: " + diffTime);
//time apary(remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

//minute until train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//create the new row
var newRow=$("<tr>").append(
$("<td>").text(shipName),
$("<td>").text(shipDestination),
$("<td>").text(shipFrequency),
$("<td>").text(moment(nextTrain).format("YYYY/MM/DD hh:mm a")),
$("<td>").text(tMinutesTillTrain)
);

//Append the new row to the table
$("#ship-table > tbody").append(newRow);


});