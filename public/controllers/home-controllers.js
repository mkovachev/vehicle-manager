let homeController = function () {

    function getAllVehicle(context) {
        //$.get('templates/home.handlebars', function (html) {
        //    context.$element().html(html);
        //});
        templates.get('home')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    return {
        getAllVehicle: getAllVehicle
    };
}();