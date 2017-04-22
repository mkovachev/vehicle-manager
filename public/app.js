(function() {
  const sammyApp = Sammy("#root-container", function() {
    this.get("#/", homeController.getOverview);
    this.get("#/addvehicle", addController.addVehicle);
    this.get("#/mycars", myCarsController.getAllVehicles);
    this.get("#/events", eventsController.getAllEvents);
    this.get("#/reports", reportsController.getReport);
  });

  $(function() {
    sammyApp.run("#/");
  });
})();
