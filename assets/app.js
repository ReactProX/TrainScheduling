var firebaseConfig = {
    apiKey: "AIzaSyDMy8-w2fw92CDR2wuYe7xKYyY1VDl58fU",
    authDomain: "trainscheduler-26594.firebaseapp.com",
    databaseURL: "https://trainscheduler-26594.firebaseio.com",
    projectId: "trainscheduler-26594",
    storageBucket: "trainscheduler-26594.appspot.com",
    messagingSenderId: "560522279746",
    appId: "1:560522279746:web:37c259671764754b"
  };
 
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function(){
    //get input data
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    //clear input boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

    //build json object to push into firebase
    var newTrain = {
        trainName : trainName,
        destination : destination,
        trainTime : trainTime,
        frequency : frequency,
    }

    console.log(newTrain);

    database.ref().push(newTrain);
});

//add new html to page when a child is added to the firebase
database.ref().on("child_added", function(childSnapchat){
    console.log(childSnapchat.val());
    
    //obtain information from database
    var trainName = childSnapchat.val().trainName;
    var destination = childSnapchat.val().destination;
    var frequency = childSnapchat.val().frequency;
    var nextTrain = "hard math";
    var minutesAway = "other hard math";

    //build new table row with data from database
    var newRow = $("<tr>");
    newRow.append("<td>" + trainName + "</td>");
    newRow.append("<td>" + destination + "</td>");
    newRow.append("<td>" + frequency + "</td>");
    newRow.append("<td>" + nextTrain + "</td>");
    newRow.append("<td>" + minutesAway + "</td>");

    //add new row to existing table
    $("#scheduleOutput").append(newRow);
});