const loginController = (function () {
  function login(context) {
    templates.get("login")
      .then(function (template) {
        context.$element().html(template());
      });
  }

  return {
    login
  };
})();