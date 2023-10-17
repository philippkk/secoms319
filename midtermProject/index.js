console.log("hehe");

let tempData = document.getElementById('tempData');

let coolColor = "#a2b0ee";
let midColor = "#47a15c";
let hotColor = "#db4848";

function setTempColor(temp){
    if(temp > 75){
        tempData.style.color = hotColor
    }else if(temp > 45){
        tempData.style.color = midColor
    }else{
        tempData.style.color = coolColor
    }
}



