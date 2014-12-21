// var request = require('superagent');
var request = superagent;

/* TODO clean this whole ajaxed mustache scripts issue */
function Swiper (callback) {
    var externalMustacheScripts = [].slice.call(document.querySelectorAll('script[id][type="text/mustache"]'));
    var i = 0;
    externalMustacheScripts.forEach(function (script) {
        var id  = script.getAttribute('id');
        var src = script.getAttribute('src');

        function onAjaxCallback (res) {
            script.removeAttribute('src');
            script.innerHTML = res.text;
            onComplete();
        }

        request.get(src, onAjaxCallback);
    });
    function onComplete () {
        i++;
        if (i === externalMustacheScripts.length) {
            callback();
        }
    }
}
