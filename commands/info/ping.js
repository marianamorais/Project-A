/**
 * O comando "ping" mostra a latência do bot.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: async (client, message) => {
		const embed = new Discord.RichEmbed()
			.setAuthor('🏓 ' + parseInt(client.ping) + 'ms')
			.setColor(process.env.COLOR);

		message.channel.send(embed);
	},

	conf: {},

	get help() {
		return {
			name: 'ping',
			category: 'info',
			description: 'O comando "ping" mostra a latência do bot.',
			usage: 'ping',
		};
	},
};