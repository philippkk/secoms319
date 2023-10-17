console.log("hehe");


let tempDataF = document.getElementById('tempDataF');
let tempDataC = document.getElementById('tempDataC');
let tempDate = document.getElementById('tempDate');
let tempBack = document.getElementById('tempback');

let humid = document.getElementById('humid');
let humidDate = document.getElementById('humidDate');

let coolR = 162;
let coolG = 176;
let coolB = 238;
let hotR = 230;
let hotG = 106;
let hotB = 106;
let color = "";


getData();
setInterval(getData,10000);

function tempColor(temp){
    if(temp > 80){
        color = "rgb(230, 106, 106)";
    }
    if(temp < 30){
        color = "rgb(162, 176, 238)";
    }
    var colorR = coolR + ((temp-30)/50)*(hotR-coolR);
    var colorG = coolG + ((temp-30)/50)*(hotG-coolG);
    var colorB = coolB + ((temp-30)/50)*(hotB-coolB);
    color = "rgb("+colorR+","+colorG+","+colorB+")";
    return color;
}
function humidityColor(hunidity){
    var colorR = coolR + ((hunidity)/100)*(hotR-coolR);
    var colorG = coolG + ((hunidity)/100)*(hotG-coolG);
    var colorB = coolB + ((hunidity)/100)*(hotB-coolB);
    color = "rgb("+colorR+","+colorG+","+colorB+")";
    return color;
}
function getData(){
    console.log("getting data");
    getTempData();
    getHumidityData();
}
function getTempData(){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => setTempData(data));
}
function getHumidityData(){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => setHumdityData(data));
}
function setTempData(data){
    console.log(data);
    tempDataF.innerHTML = "<strong>"+data.data[0].temp_f + "°F</strong>";
    tempDataF.style.padding = '15px';
    tempDataC.innerHTML = "<strong>"+data.data[0].temp_c + "°C</strong>";
    tempDataC.style.padding = '15px';
    tempDate.innerHTML = "<strong>Date: " +data.data[0].date+"</strong>";

    setTempColor(tempDataF,data.data[0].temp_f);
    setTempColor(tempDataC,data.data[0].temp_f);
}
function setTempColor(back,temp){
    back.style.backgroundColor = tempColor(temp);
}
function setHumdityData(data){
    console.log(data);
    humid.innerHTML = "<strong>"+data.data[0].humid +"%</strong>";
    humid.style.padding = '15px';
    humidDate.innerHTML = "<strong>Date: " + data.data[0].date+"</strong>";

    setHumidColor(data.data[0].humid);
}
function setHumidColor(humidity){
    humid.style.backgroundColor = humidityColor(humidity);
}


