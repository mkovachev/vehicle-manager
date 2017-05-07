class Truck extends Vehicle {
 
  constructor (brand, model, license, yearOfManufacture, owner, capacity) {
    super(brand, model, license, yearOfManufacture, owner);
    this.capacity = capacity;
  }

  module.exports = Truck;