/* TODO clean this up */
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

        superagent.get(src, onAjaxCallback);
    });
    function onComplete () {
        i++;
        if (i === externalMustacheScripts.length) {
            callback();
        }
    }
}
