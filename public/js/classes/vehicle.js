function validateYear(year) {
    if(typeof year !== 'number' || Number.isNaN(year) || year.length !== 4) {
        throw Error('Year of production is not valid. Please type enter a valid year ');
    }
}

function validateKm(km) {
    if(typeof km !== 'number' || Number.isNaN(km)) {
        throw Error('Invalid format of kilometers.');
    }
}

function validateString(string) {
    if(typeof string !== 'string') {
        throw Error('Input is not valid');
    }
}

function removeWhiteSpace(license){
    license.replace(/\s/g,'');
}


export class Vehicle {
    constructor(brand, model, year, license, km) {

        validateString(brand);
        validateString(model);
        validateYear(year);
        removeWhiteSpace(license);
        validateKm(km);

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


