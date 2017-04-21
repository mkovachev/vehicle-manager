(function () {
    const sammyApp = Sammy('#content', function () {

        // localhost:3000/#/
        this.get('#/', homeController.getAllVehicle);
        this.get('#/mycars', );
        this.get('#/events', );
        this.get('#/reports', );
    });

    $(function () {
        sammyApp.run('#/');
    })

})();