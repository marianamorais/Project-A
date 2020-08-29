/**
 * O Comando "avatar" mostrará a imagem de perfil do usuário.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: function(client, message) {
		const user = message.mentions.users.first() || message.author;

		const avatarEmbed = new Discord.RichEmbed()
			.setColor(process.env.COLOR)
			.setAuthor(`🖼️ Avatar do(a) ${user.tag}`)
			.setImage(user.avatarURL)
			.setDescription(`**Clique [aqui](${user.displayAvatarURL}) para baixar a imagem!**`)
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

		message.channel.send(avatarEmbed);
	},
	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'avatar',
			description: 'Mostra o avatar de um usuário',
			usage: 'avatar',
		};
	},
};