const homeController = (function() {
  function getAllVehicle(context) {
    templates.get("home").then(function(template) {
      context.$element().html(template());
    });
  }

  return {
    getAllVehicle: getAllVehicle
  };
})();

// Option 2

//$.get('templates/home.handlebars', function (html) {

// context.$element().html(html);

//});
