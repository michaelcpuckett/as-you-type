// var require('./ViewController');
// var require('moment');
function ChatMessagesViewController () {
    var args = [].slice.call(arguments);
    args.push('Messages');
    args.push({
        'keypress': {
            'Messages-input': function (e) {
                if (this.data.user === 'self') {
                    var char = String.fromCharCode(event.which);
                    this.setMessage(char);
                    socket.emit('chat message', char);
                }
                e.preventDefault();
                return;
            }.bind(this)
        }
    });
    this.init.apply(this, args);

    this.data['log'] = [{'socketconnection': socket}];
}
ChatMessagesViewController.prototype = new ViewController();
ChatMessagesViewController.prototype.onRender = function () {
    [].slice.call(this.elem.querySelectorAll('textarea')).forEach(function (textareaElem) {
        textareaElem.scrollTop = textareaElem.scrollHeight;
    });
};
ChatMessagesViewController.prototype.cacheMessage = function (message) {
    this.data.messagesCache = this.data.messagesCache || '';
    this.data.messagesCache += message + '\n' + moment().format('h:mm') + '\n';
    this.data.message = '';
};
ChatMessagesViewController.prototype.setMessage = function (char) {
    this.data.message = this.data.message || '';
    this.data.message += char;
};
/* TODO: Not being called yet; issues with keydown/keypress eventbindings */
ChatMessagesViewController.prototype.backspace = function () {
    this.data.message = this.data.message || ' ';
    this.data.message = this.data.message.slice(0, -1);
};
