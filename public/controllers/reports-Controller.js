const reportsController = (function() {
  function getReport(context) {
    templates.get("reports").then(function(template) {
      context.$element().html(template());
    });
  }

  return {
    getReport: getReport
  };
})();
