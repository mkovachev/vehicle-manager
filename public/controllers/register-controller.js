const registerController = (function() {
  function registerUser(context) {
    templates.get("register").then(function(template) {
      context.$element().html(template());
    });
  }

  return {
    registerUser: registerUser
  };
})();
