const myCarsController = (function() {
  function getAllVehicles(context) {
    templates.get("mycars").then(function(template) {
      context.$element().html(template());
    });
  }

  return {
    getAllVehicles: getAllVehicles
  };
})();
