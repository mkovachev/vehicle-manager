(function () {
  const sammyApp = Sammy("#root", function () {
<<<<<<< HEAD:public/app.js
    this.get("#/landing", landingController.registerOrLogin);
=======
>>>>>>> c4c6a1b1e972e2b950aba5ec1a2c6d2490d381cb:public/sammyRouter.js
    this.get("#/", homeController.getOverview);
    this.get("#/addvehicle", addController.addVehicle);
    this.get("#/mygarage", myGarageController.getAllVehicles);
    this.get("#/events", eventsController.getAllEvents);
    this.get("#/reports", reportsController.getReport);
    this.get("#/login", loginController.login);
  });

  $(function () {
    sammyApp.run("#/");
  });
<<<<<<< HEAD:public/app.js
})();



/* When creating DOM elements dynamically, the elements with
MDL classes will need to be re-rendered. Using upgradeElement function 
in order to render all elements upon page load. 
*/

setInterval("upgradeMDL();", 100);
function upgradeMDL() {
  componentHandler.upgradeDom();

}

=======
})();
>>>>>>> c4c6a1b1e972e2b950aba5ec1a2c6d2490d381cb:public/sammyRouter.js
