const homeController = (function () {
  function getOverview(context) {
    templates.get("home")
      .then(function (template) {
        context.$element().html(template());
      });
  }

  return {
    getOverview
  };
})();

// Option 2

//$.get('templates/home.handlebars', function (html) {

// context.$element().html(html);

//});