const Discord = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setAuthor(`🏓 ` + parseInt(client.ping) + "ms")
      .setColor("#74c1ff"); //Cor

    message.channel.send(embed);
  },

  conf: {},
  
  get help() {
    return {
      name: "ping",
      description: "Mostra a latência do bot.",
      usage: "ping",
    };
  },
};
