class Car {
    constructor(cars) {
        this.cars = cars;
    }
    
    filtermobil() {
        var driver = document.getElementById("driver").value;
        var date = document.getElementById('date').value;
        var time = document.getElementById('time').value;
        var dateTime = date + time;
        var passanger = document.getElementById('passanger').value;

        if (driver === undefined || driver === "") {
            alert("Please select a driver");
            return;
        } else if (dateTime < getDateTimeNow()) {
            alert("Please select a date and time greater than now");
            return;
        } else if (passanger == "" && driver != "") {
            return this.cars.filter(car => car.availableAt <= dateTime);
        } else if (passanger != "" && driver != "") {
            return this.cars.filter(car => car.capacity >= passanger && car.availableAt <= dateTime);
        }
    }
}


var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "http://127.0.0.1:8000/getcars", false);
xmlHttp.send(null); 


var data = JSON.parse(xmlHttp.responseText);
var cars = new Car(data);
var app = document.getElementById('car-cards');
htmlData = "";

data = cars;
var btnFilterCar = document.getElementById('btnFilterCar').addEventListener('click', getCars);

function getDateTimeNow() {
    var today = new Date();
    var date = today.getFullYear()+'-'+String((today.getMonth()+1)).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');
    var time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
    var dateNow = date+'T'+time+'.000Z';
    return dateNow;
}


function getCars() {
    var htmlData = "";
    data = cars.filtermobil();
    if (data === "" || data === undefined) {
        htmlData = "";
        app.innerHTML = htmlData;
        return;
    } else {
        for (let index = 0; index < data.length; index++) {
            var car = data[index];
           
            htmlData += `
            <div class="car-cards-card">
            <img src="${car.image}" class="car-image">
            <div class="car-cards-card-title">
                <h6>${car.manufacture} - ${car.model}</h6>
                <h6>Rp.${car.rentPerDay} / hari</h6>
            </div>
            <p class="car-desc">${car.description}</p>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/capacity.png" alt="">
                <p>${car.capacity} Orang</p>
            </div>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/engine.png" alt="">
                <p>${car.transmission}</p>
            </div>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/year.png" alt="">
                <p>Tahun ${car.year}</p>
            </div>

            <button type="button" class="btn car-card-button">Register</button>
            <!-- <div class="car-cards-card-attibute">
            </div> -->
        </div>
            `;
        }
        app.innerHTML = htmlData;
        if (htmlData == "") {
            alert("No car available");
        }
    }
}