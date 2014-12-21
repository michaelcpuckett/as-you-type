function HTTPError () {
    var i = Math.floor(Math.random() * this.statuses.length);
    return this.statuses[i];
}
HTTPError.prototype.statuses = [{
    status: 301,
    message: "Moved Permanently"
}, {
    status: 403,
    message: "Forbidden"
}, {
    status: 404,
    message: "Not Found"
}, {
    status: 503,
    message: "Service Unavailable"
}];

function Roulette (response, hasHighErrorProbability, contentType) {
    errorProbability = hasHighErrorProbability ? .88 : .12;
    contentType = contentType || "application/json";
    var err = new HTTPError();
    var isError = this.isHTTPError(errorProbability);
    if (response) {
        if (isError) {
            response.writeHead(err.status, {"content-type": "application/json"});
            response.end(JSON.stringify(err));
        } else {
            response.writeHead(200, {"content-type": contentType});
        }
    } else {
        if (isError) {
            throw new Error(JSON.stringify(err));
        }
    }
}
Roulette.prototype.isHTTPError = function (errorProbability) {
    return (errorProbability > Math.random());
};

module.exports = Roulette;
