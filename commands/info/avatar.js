/**
 * O Comando "avatar" mostrará a imagem de perfil do usuário ou do bot
 */

const Discord = require("discord.js");

module.exports = {
  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
   */

  run: function (client, message, args) {
    const user = message.mentions.users.first() || message.author;

    const avatarEmbed = new Discord.RichEmbed()
      .setColor("#74c1ff") //Cor
      .setAuthor(`🖼️ Avatar do(a) ${user.tag}`)
      .setImage(user.avatarURL)
      .setDescription(
        `**Clique [aqui](${user.displayAvatarURL}) para baixar a imagem!**`
      )
      .setFooter(
        "2020 © Liga dos Programadores",
        "https://i.imgur.com/Mu4KEVh.png?width=5000,height=100",
        (dynamic = true),
        (size = 256)
      )
      .setTimestamp();

    message.channel.send(avatarEmbed);
  },
  conf: {},

  /**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
   */
  get help() {
    return {
      name: "avatar",
      description: "Mostra o avatar de um usuário",
      usage: "avatar",
    };
  },
};
