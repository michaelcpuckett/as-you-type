// var Mustache = require('mustache');
function ViewController (elem) {}
ViewController.prototype.init = function (elem, tpl, events) {
    console.log(arguments);
    this.elem = elem;
    this.template = document.getElementById(tpl).innerText;
    this.data = {};
    for (data in this.elem.dataset) {
        if (this.elem.dataset.hasOwnProperty(data)) {
            this.data[data] = this.elem.dataset[data];
        }
    }

    Object.observe(this.data, function (change) {
        this.render();
        (this.onRender) && this.onRender();
    }.bind(this));

    for (eventType in events) {
        if (events.hasOwnProperty(eventType)) {
            document.body.addEventListener(eventType, function (e) {
                var targetElem = e.target.getAttribute('class');
                if (targetElem in events[eventType]) {
                    events[eventType][targetElem](e);
                }
            });
        }
    }
}
ViewController.prototype.render = function () {
    this.elem.innerHTML = Mustache.render(this.template, this.data);
};
