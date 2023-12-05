let humidity = 0;
var temperature = 0;
var photoResistor = 0;
var soilMoisture = 0;

var waterPumpValue = 0;
var servoMotorValue = 0;
var roofMotorValue = 0;


const firebaseConfig = {
    apiKey: "AIzaSyA0vUouXw1ax_9CfdIO55LX0LEdAi0fhpE",
    authDomain: "iot-cw-00011581-6458a.firebaseapp.com",
    databaseURL: "https://iot-cw-00011581-6458a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "iot-cw-00011581-6458a",
    storageBucket: "iot-cw-00011581-6458a.appspot.com",
    messagingSenderId: "602842487625",
    appId: "1:602842487625:web:7c677ff1a91d16bb279898",
    measurementId: "G-B03YWK1WBK"
    };


firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Sensors
var dbHumidity = database.ref('Humidity');
var dbTemperature = database.ref('Temperature');
var dbPhotoResistor = database.ref('PhotoResistor');
var dbSoilMoisture = database.ref('soilMoisture');

// Activators
var dbRoofMotorStatus = database.ref('roofMotorStatus');
var dbServoMotorStatus = database.ref('servoMotorStatus');
var dbWaterPumpStatus = database.ref('waterPumpStatus');


// Fetch the data for Sensors
dbHumidity.on('value', function(getdata1){
    humidity = getdata1.val();
    document.getElementById('humidity_value').innerHTML = humidity;
})

dbTemperature.on('value', function(getdata2){
    temperature = getdata2.val();
    document.getElementById('temperature_value').innerHTML = temperature + "&#8451;";
})

dbPhotoResistor.on('value', function(getdata2){
    photoResistor = getdata2.val();
    document.getElementById('photo_resistor_value').innerHTML = photoResistor;
})

dbSoilMoisture.on('value', function(getdata2){
    soilMoisture = getdata2.val();
    document.getElementById('soil_moisture_value').innerHTML = soilMoisture + "%";
})


// Fetching values of Actuators
dbRoofMotorStatus.on('value', function(getdata2){
    roofMotorValue = getdata2.val();
    handleRoofMotorButton(roofMotorValue);
})

dbServoMotorStatus.on('value', function(getdata2){
    servoMotorValue = getdata2.val();
    handleServoMotorButton(servoMotorValue);
})

dbWaterPumpStatus.on('value', function(getdata2){
    waterPumpValue = getdata2.val();
    handleWaterPumpButton(waterPumpValue);
})


// Handling button text
function handleRoofMotorButton(value) {
    var roofButton = document.getElementById("roofBtn")
    if (value == 1){
        roofButton.classList.add("btn-outline-danger");
        roofButton.classList.remove("btn-success");
        roofButton.innerText = "OFF"
    }
    else {
        roofButton.classList.add("btn-success");
        roofButton.classList.remove("btn-outline-danger");
        roofButton.innerText = "ON"
    }
}

function handleServoMotorButton(value) {
    var servoButton = document.getElementById("servoBtn")
    if (value == 1){
        servoButton.classList.remove("btn-success");
        servoButton.classList.add("btn-outline-danger");
        servoButton.innerText = "OFF"
    }
    else {
        servoButton.classList.remove("btn-outline-danger");
        servoButton.classList.add("btn-success");
        servoButton.innerText = "ON"
    }
}

function handleWaterPumpButton(value) {
    var waterButton = document.getElementById("waterBtn")
    if (value == 1){
        waterButton.classList.remove("btn-success");
        waterButton.classList.add("btn-outline-danger");
        waterButton.innerText = "OFF"
    }
    else {
        waterButton.classList.remove("btn-outline-danger");
        waterButton.classList.add("btn-success");
        waterButton.innerText = "ON"
    }
}


// Handling onClick actions
function onClickRoof() {
    if (roofMotorValue == 0) {
        dbRoofMotorStatus.set(1);
        handleRoofMotorButton(1);
    }
    else {
        dbRoofMotorStatus.set(0);
        handleRoofMotorButton(0);
    }
}

function onClickServo() {
    if (servoMotorValue == 0) {
        dbServoMotorStatus.set(1);
        handleServoMotorButton(1);
    }
    else {
        dbServoMotorStatus.set(0);
        handleServoMotorButton(0);
    }
}

function onClickWater() {
    if (waterPumpValue == 0) {
        dbWaterPumpStatus.set(1);
        handleWaterPumpButton(1);
    }
    else {
        dbWaterPumpStatus.set(0);
        handleWaterPumpButton(0);
    }
}
