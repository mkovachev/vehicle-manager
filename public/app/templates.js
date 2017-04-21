const templates = function () {
    function get(name) {
        const promise = new Promise(function (resolve, reject) {
            const url = `templates/${name}.handlebars`;
            $.get(url, function (html) {
                const template = Handlebars.compile(html);
                resolve(template);
            });
        });
        return promise;
    }

    return {
        get: get
    };
}();