//import { Vehicle } from './classes/vehicle.js';
class Vehicle {
    constructor(brand, model, year, license, km) {
        this._brand = brand;
        this._model = model;
        this._year = year;
        this._license = license;
        this._km = km;
    }

    get brand() {
        return this._brand;
    }
    set brand(value) {
        this._brand = value;
    }
    get model() {
        return this._model;
    }
    set model(value) {
        this._model = value;
    }
    get year() {
        return this._year;
    }
    set year(value) {
        this._year = value;
    }
    get license() {
        return this._license;
    }
    set license(value) {
        this._license = value;
    }
    get km() {
        return this._km;
    }
    set km(value) {
        this._km = value;
    }
}




let vehicle = new Vehicle();


save.addEventListener("click", function () {
    vehicle.brand = document.getElementById('brand').value;
    vehicle.model = document.getElementById('model').value;
    vehicle.year = document.getElementById('year').value;
    vehicle.license = document.getElementById('license').value;
    vehicle.km = document.getElementById('km').value;


    console.log(vehicle);
});


//vehicle.vehicleType = document.getElementById('vehicle-type').value;


console.log('opening in browser');