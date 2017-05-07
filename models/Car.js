class Car extends Vehicle {
 
  constructor (brand, model, license, yearOfManufacture, owner, type, numberOfDoors) {
    super(brand, model, license, yearOfManufacture, owner);
    this.type = type;
    this.numberOfDoors = numberOfDoors;
  }

   module.exports = Car;