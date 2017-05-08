class Motorcycle extends Vehicle {

  constructor(brand, model, license, yearOfManufacture, owner, capacity) {
    super(brand, model, license, yearOfManufacture, owner, enginePower);
    this.enginePower = enginePower;
  }
}

module.exports = Motorcycle;