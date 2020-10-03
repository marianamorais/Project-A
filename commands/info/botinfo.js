/**
 * O Comando "botinfo" mostrará informações do bot.
*/

const Discord = require('discord.js');
const moment = require('moment');
require('dotenv').config();

moment.locale('pt-br');

module.exports = {
	run: function(client, message) {
		const botAvatar = client.user.displayAvatarURL;
		const date = client.user.createdAt;
		const botName = client.user.username;

		const totalSeconds = client.uptime / 1000;
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor(totalSeconds / 60);
		const uptime = `${days} dias, ${hours} horas e ${minutes} minutos`;
		const link = 'https://github.com/Liga-dos-Programadores/Project-A';

		const embed = new Discord.RichEmbed()
			.setColor(process.env.COLOR)
			.setThumbnail(botAvatar)
			.setAuthor('🤖 Minhas informações')
			.addField('🧾 **Meu nome**', botName)
			.addField('🟢 **Estou online a**', uptime)
			.addField('🎉 **Fui criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date), true)
			.addField('🔗 **Meu código fonte**', link)
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

		message.channel.send(embed);
	},

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'botinfo',
			category: 'info',
			description: 'Mostra informações sobre o bot',
			usage: 'botinfo',
		};
	},
};

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate(template, date) {
	const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
	date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
	return date.toISOString().split(/[-:.TZ]/).reduce(function(templateString, item, i) {
		return templateString.split(specs[i]).join(item);
	}, template);
}