// var Swiper = require('./util/Swiper');
// var ChatMessagesViewController = require('./ChatMessagesViewController');
// var socket = require('socket.io');
var socket = io();
new Swiper(function () {
    new ChatMessagesViewController(document.querySelectorAll('.Messages[data-user="self"]')[0]);
    var partnerChatMessages = new ChatMessagesViewController(document.querySelectorAll('.Messages[data-user="partner"]')[0]);

    socket.on('chat message', function (char) {
        partnerChatMessages.setMessage(char);
    });

});
