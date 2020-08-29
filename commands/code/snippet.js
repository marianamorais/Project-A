/**
  * O Comando "snippet" vai enviar uma mensagem ao usuário mostrando como deve ser enviado exemplo de linhas de código.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

	run: function(client, message) {

		// Criando embed que sera enviado para o usuário

		const snippetEmbed = new Discord.RichEmbed()
			.setColor(process.env.COLOR)
			.setAuthor('💻 Snippet de código')
			.setDescription('**Ao enviar um snippet (trecho de código), siga o modelo da imagem.**\nPara mais informações você pode acessar: [Formatação Discord](https://support.discord.com/hc/pt-br/artAicles/210298617-Noções-básicas-de-marcação-de-texto-Formatação-do-chat-negrito-itálico-e-sublinhado-\').')
			.setImage('https://i.imgur.com/i5b7pYf.png')
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
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
	get help() {
		return {
			name: 'snippet',
			category: 'Ajuda',
			description: 'Template de como fazer uma pergunta.',
			usage: 'snippet',
		};
	},
};