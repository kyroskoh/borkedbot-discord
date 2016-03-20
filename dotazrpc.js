var zerorpc = require("zerorpc"),
    util = require('util'),
    zrpc = new zerorpc.Client();

zrpc.on("error", function(error) {
    console.error("RPC client error:", error);
});

exports.connect = function(addr, port) {
    addr = addr || '0.0.0.0';
    port = port || '29390';

    zrpc.connect(util.format("tcp://%s:%s", addr, port));
}

exports.client = zrpc
