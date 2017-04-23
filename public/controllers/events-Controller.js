const eventsController = (function () {
  function getAllEvents(context) {
    templates.get("events")
      .then(function (template) {
        context.$element().html(template());
      });
  }

  return {
    getAllEvents
  };
})();