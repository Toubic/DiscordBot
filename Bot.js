require('dotenv').config()
const Discord = require("discord.js");
const Scry = require("scryfall-sdk");
 
const client = new Discord.Client({
    partials: ["MESSAGE"]
});

module.exports.Connect = function(){

    client.on('ready', () => {
        console.log("Boten Anna is online");
    });

    client.login(process.env.OAUTH_TOKEN);
};

function getCommand(sMessage){
    let sCommand;

    sCommand = sMessage.trim();

    if(sCommand.indexOf(" ") > 0){
        sCommand = sCommand.slice(0,sCommand.indexOf(" "));
    }

    return sCommand;
};

module.exports.DiscordCommands = function(){
    let sCommand;

    client.on("message", msg => {
        sCommand = getCommand(msg.content);
        
        switch(sCommand){
            case "!themesong":
                msg.reply("https://www.youtube.com/watch?v=bpRRVS1ci40");
                break;
            case "!card":
                message = msg.content.slice(5).trim();
                Scry.Cards.byName(message).then((result) => { 
                    msg.reply(result.name + " (" + result.set + ") " + result.mana_cost + " " + " (" + result.type_line + ") " + " " + result.oracle_text + " " + result.flavor_text); 
                });
                break;
            default:
                //client.action("Twibbe",user["display-name"] + " that command does not exist.");
        }
    });
};

module.exports.Disconnect = function(){

    client.destroy();
    console.log("Boten Anna is offline");
};