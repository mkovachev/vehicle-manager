const landingController = (function() {
  function registerOrLogin(context) {
    templates.get("landing").then(function(template) {
      context.$element().html(template());
    });
  }

  return {
    registerOrLogin: registerOrLogin
  };
})();
