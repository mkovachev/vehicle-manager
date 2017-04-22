(function() {
  const sammyApp = Sammy("#root-container", function() {
    this.get("#/", homeController.getAllVehicle);
    this.get("#/addvehicle", addController.addVehicle);
    this.get("#/mycars");
    this.get("#/events");
    this.get("#/reports");
  });

  $(function() {
    sammyApp.run("#/");
  });
})();
