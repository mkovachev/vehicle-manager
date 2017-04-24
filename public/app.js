(function () {
  const sammyApp = Sammy("#root", function () {
    this.get("#/landing", landingController.registerOrLogin);
    this.get("#/", homeController.getOverview);
    this.get("#/addvehicle", addController.addVehicle);
    this.get("#/mycars", myCarsController.getAllVehicles);
    this.get("#/events", eventsController.getAllEvents);
    this.get("#/reports", reportsController.getReport);
    this.get("#/login", loginController.login);
  });

  $(function () {
    sammyApp.run("#/");
  });
})();



/* When creating DOM elements dynamically, the elements with
MDL classes will need to be re-rendered. Using upgradeElement function 
in order to render all elements upon page load. 
*/

setInterval("upgradeMDL();", 100);
function upgradeMDL() {
  componentHandler.upgradeDom();

}

