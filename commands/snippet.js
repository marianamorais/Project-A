/**
  * O Comando "howtoask" vai enviar uma mensagem ao usuário mostrando como o mesmo deve realizar uma pergunta sobre determinada linha de código.
*/

const Discord = require('discord.js')

module.exports = {

  /**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

  run: function (client, message, args) {

    // Criando embed que sera enviado para o usuário

    const link = "https://support.discord.com/hc/pt-br/articles/210298617-Noções-básicas-de-marcação-de-texto-Formatação-do-chat-negrito-itálico-e-sublinhado-";

    const snippetEmbed = new Discord.RichEmbed()
    .setColor("#74c1ff") //Cor
    .setAuthor("💻 Snippet de código")
    .setDescription("**Basicamente você precisa deixar seu código dentro de três acentos graves. (```).** \n Para mais informações você pode acessar: [Formatação Discord](https://support.discord.com/hc/pt-br/articles/210298617-Noções-básicas-de-marcação-de-texto-Formatação-do-chat-negrito-itálico-e-sublinhado-').")
    .setFooter("2020 © Liga dos Programadores", "https://i.imgur.com/Mu4KEVh.png?width=5000,height=100", dynamic= true, size= 256)
    .setTimestamp();

    // Aqui será enviado o embed no canal que o usuário executo o comando
    message.channel.send(snippetEmbed);
  },
  /**
    * Aqui podemos colocar mais algumas configurações do comando.
    */
  conf: {},

  /**
    * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
    */
  get help () {
    return {
      name: 'snippet',
      category: 'Ajuda',
      description: 'Template de como fazer uma pergunta.',
      usage: 'snippet'
    }
  }
}
