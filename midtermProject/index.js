console.log("hehe");


let tempDataF = document.getElementById('tempDataF');
let tempDataC = document.getElementById('tempDataC');
let tempDate = document.getElementById('tempDate');
let tempBack = document.getElementById('tempback');
let tempImage = document.getElementById('tempPic');
let humidPic = document.getElementById('humidPic');

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
setInterval(getData,1000);

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
    if(tempDataF == null)
        return;
    tempDataF.innerHTML = "<strong>"+data.data[0].temp_f + "°F</strong>";
    tempDataF.style.padding = '15px';
    tempDataC.innerHTML = "<strong>"+data.data[0].temp_c + "°C</strong>";
    tempDataC.style.padding = '15px';
    tempDate.innerHTML = "<strong>Date: " +data.data[0].date+"</strong>";

    setTempColor(tempDataF,data.data[0].temp_f);
    setTempColor(tempDataC,data.data[0].temp_f);
    setTempPic(data.data[0].temp_f);
    if(document.getElementById('t1hour') != null){
        setTempAvg(data);
    }
}
function setTempColor(back,temp){
    back.style.backgroundColor = tempColor(temp);
}
function setTempPic(temp){
    console.log("setting image");
    if(temp >= 80){
        var num = Math.random() ;
        console.log(num);
        if(num > .5){
            tempImage.src = "./images/snowmanBoiling.jpg";
        }else{
            tempImage.src = "./images/boilingtwo.jpg";
        }
    }else if(temp >= 60){
        tempImage.src = "./images/snowmanSpring.jpg";
    }else if(temp >= 40){
        tempImage.src = "./images/cnowmanMelting.jpg";
    }else{
        tempImage.src = "./images/snowmanCold.jpg";
    }
}
function setTempAvg(data){
    var hour = 0;
    var day = 0;
    var ytd = 0;
    for(i = 0;i < data.data.length;i++){
        if(i < 6){
            hour += data.data[i].temp_f;
        }
        if(i < 144){
            day += data.data[i].temp_f;
        }
        ytd +=data.data[i].temp_f
    }
    if(data.data.length< 6){
        hour/=data.data.length;
    }else{
        hour/=6;
    }
    if(data.data.length<144){
        day/=data.data.length;
    }else{
        day/=144;
    }
    document.getElementById('t1hour').innerHTML = "<strong>1 hour average: " + hour.toFixed(2) +"F°</strong>";
    document.getElementById('t1hour').style.backgroundColor = tempColor(hour);
    document.getElementById('t24hour').innerHTML= "<strong>1 day average: " + day.toFixed(2) +"F°</strong>";
    document.getElementById('t24hour').style.backgroundColor = tempColor(day);
    document.getElementById('tytd').innerHTML= "<strong>ytd average: " + (ytd/data.data.length).toFixed(2) +"F°</strong>";
    document.getElementById('tytd').style.backgroundColor = tempColor((ytd/data.data.length).toFixed(2));

}


function setHumdityData(data){
    if(humid == null)
        return;
    humid.innerHTML = "<strong>"+data.data[0].humid +"%</strong>";
    humid.style.padding = '15px';
    humidDate.innerHTML = "<strong>Date: " + data.data[0].date+"</strong>";

    setHumidColor(data.data[0].humid);
    setHumidPic(data.data[0].humid);
    if(document.getElementById('h1')!= null){
        setHumidityAvg(data);
    }
}
function setHumidColor(humidity){
    humid.style.backgroundColor = humidityColor(humidity);
}
function setHumidPic(humidity){
    if(humidity <= 50){
        humidPic.src = "./images/dryman.jpg";
    }else{
        humidPic.src = "./images/highhumid.jpg";

    }
}
function setHumidityAvg(data){
        var hour = 0;
        var day = 0;
        var ytd = 0;
        for(i = 0;i < data.data.length;i++){
            if(i < 6){
                hour += data.data[i].humid;
            }
            if(i < 144){
                day += data.data[i].humid;
            }
            ytd +=data.data[i].humid
        }
        if(data.data.length< 6){
            hour/=data.data.length;
        }else{
            hour/=6;
        }
        if(data.data.length<144){
            day/=data.data.length;
        }else{
            day/=144;
        }
        document.getElementById('h1').innerHTML = "<strong>1 hour average: " + hour.toFixed(2) +"%</strong>";
        document.getElementById('h1').style.backgroundColor = tempColor(hour);
        document.getElementById('h24').innerHTML= "<strong>1 day average: " + day.toFixed(2) +"%</strong>";
        document.getElementById('h24').style.backgroundColor = tempColor(day);
        document.getElementById('hytd').innerHTML= "<strong>ytd average: " + (ytd/data.data.length).toFixed(2) +"%</strong>";
        document.getElementById('hytd').style.backgroundColor = tempColor((ytd/data.data.length).toFixed(2));
}


