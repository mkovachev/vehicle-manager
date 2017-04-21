(function () {
    var sammyApp = Sammy('#root', function () {

        // localhost:3000/#/
        this.get('#/', function () {
            console.log('Home');
        });
    });

    $(function () {
        sammyApp.run('#/');
    })

})();