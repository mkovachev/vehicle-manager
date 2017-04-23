const addController = (function () {
  function addVehicle(context) {
    templates.get("add")
    .then(function (template) {
      context.$element().html(template());
    });
  }

  return {
    addVehicle
  };
})();