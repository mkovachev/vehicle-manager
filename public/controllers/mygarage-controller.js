const myGarageController = (function () {
  function getAllVehicles(context) {
    templates.get("mygarage")
      .then(function (template) {
        context.$element().html(template());
      });
  }

  return {
    getAllVehicles
  };
})();