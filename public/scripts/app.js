let allCar = null;

const getAllCar = () => {
    fetch('/getcars')
        .then(response => response.json())
        .then(result => {
            const body = document.getElementById('car-cards');
            for (let i = 0; i < result.length; i++) {
                const car = document.createElement('div');
                car.innerHTML = `<div class="car-cards-card">
            <img src="${result[i].image}" class="car-image">
            <div class="car-cards-card-title">
                <h6>${result[i].manufacture} - ${result[i].model}</h6>
                <h6>${result[i].rentPerDay} / hari</h6>
            </div>
            <p class="car-desc">${result[i].description}</p>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/capacity.png" alt="">
                <p>4 Orang</p>
            </div>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/engine.png" alt="">
                <p>Manual</p>
            </div>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/year.png" alt="">
                <p>Tahun 2020</p>
            </div>

            <button type="button" class="btn car-card-button">Register</button>
        </div>`

                body.appendChild(car);
            }
            
            allCar = result;
        });
}

getAllCar();

const filterCar = (char) => {

    // let newCar = allCar.filter(car => car.manufacture.toLowerCase().includes(char) && car.available == true);
    let newCar = allCar.filter(car => car.available == (char) && car.available == true);
    const body = document.getElementById('car-cards')
    body.innerHTML = ''
    newCar.forEach((element, id) => {                
        const Car = document.createElement('div')
        Car.innerHTML = `<div class="car-cards-card">
            <img src="${element.image}" class="car-image">
            <div class="car-cards-card-title">
                <h6>${element.manufacture} - ${element.model}</h6>
                <h6>Rp.${element.rentPerDay} / hari</h6>
            </div>
            <p class="car-desc">${element.description}</p>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/capacity.png" alt="">
                <p>${element.capacity} Orang</p>
            </div>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/engine.png" alt="">
                <p>${element.transmission}</p>
            </div>
            <div class="car-cards-card-attibute-sub">
                <img src="./images/year.png" alt="">
                <p>Tahun ${element.year}</p>
            </div>

            <button type="button" class="btn car-card-button">Register</button>
            <!-- <div class="car-cards-card-attibute">
            </div> -->
        </div>`
        
        body.appendChild(Car)
        
    });
}
