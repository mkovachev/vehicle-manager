(function () {
  const sammyApp = Sammy("#root", function () {
    this.get("#/", homeController.getOverview);
    this.get("#/addvehicle", addController.addVehicle);
    this.get("#/mygarage", myGarageController.getAllVehicles);
    this.get("#/events", eventsController.getAllEvents);
    this.get("#/reports", reportsController.getReport);
    this.get("#/register", registerController.registerUser);
    this.get("#/login", loginController.login);
  });

  $(function () {
    sammyApp.run("#/");
  });
})();