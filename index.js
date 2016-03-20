var Discord = require("discord.js"),
    util = require('util'),
    config = require("./config.json"),
    zrpc = require("./dotazrpc.js");

var bot = new Discord.Client();

bot.on("ready", function() {
    console.info('Username: ' + bot.user.username);
    console.info('ID: ' + bot.user.id);
    console.info('Servers: ' + bot.servers.length);
    console.info('Channels: ' + bot.channels.length);

});

bot.on('disconnected', function(disconnect) {
    console.error("Disconnected from Discord Servers!");
    console.error(disconnect);
});

bot.on('error', function(error) {
    console.error("Error received!");
    console.error(error);
});

bot.on('warn', function(warn) {
    console.error("Warning received!");
    console.error(warn);
});



bot.on("message", function(message) {
    if (message.author.id !== "103675685343612928" /* && message.channel.id !== "124809463323557888"*/ ) return;

    if (message.content.startsWith('►status')) {
        zrpc.client.invoke("status", function(e, r, m) {
            bot.sendMessage(message, util.format(
                "Dota status: %s, Steam status: %s",
                r[0] ? "ok" : "not ok",
                r[1] ? "ok" : "not ok"));
        })
    };

});


bot.login(config.username, config.password);
zrpc.connect(config.zrpc.addr, config.zrpc.port);
