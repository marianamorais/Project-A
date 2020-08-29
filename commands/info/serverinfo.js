/**
 * O Comando "serverinfo" mostrará informações do servidor.
*/

const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');
require('dotenv').config();

module.exports = {
	run: function(client, message) {

		const joined = message.member.joinedAt;
		const region = { brazil: ':flag_br: Brazil' };

		function checkBots(guild) {
			let botCount = 0;
			guild.members.forEach((member) => {
				if (member.user.bot) botCount++;
			});
			return botCount;
		}

		function checkUsers(guild) {
			let memberCount = 0;
			guild.members.forEach((member) => {
				if (member.user) memberCount++;
			});
			return memberCount;
		}

		const embed = new Discord.RichEmbed()
			.setColor(process.env.COLOR)
			.setAuthor(`📑 Informações do servidor ${message.guild.name}`)
			.addField('**👑 Dono(a) do servidor**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
			.addField('**🌎 Região do servidor**', region[message.guild.region], true)
			.addField('💬 Total de salas', message.guild.channels.size, true)
			.addField('👤 Usuários', checkUsers(message.guild), true)
			.addField('🤖 Bots', checkBots(message.guild), true)
			.addField('💼 **Total de cargos**', message.guild.roles.size, true)
			.addField('📅 **Servidor criado em**', moment(message.guild.createdAt).format('D MMMM YYYY, h:mm:ss'), true)
			.addField('🙌🏻 ** Você entrou no servidor em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined), true)
			.setFooter('2020 © Liga dos Programadores', 'https://i.imgur.com/Ji3TFMU.png', true)
			.setTimestamp();

		// Aqui sera enviado o embed no canal que o usuário executou o comando
		message.channel.send(embed);
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
			name: 'serverinfo',
			description: 'O Comando "serverinfo" mostrará informações do servidor.',
			usage: 'serverinfo',
			aliases: ['server'],
		};
	},
};

function formatDate(template, date) {
	const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
	date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
	return date
		.toISOString()
		.split(/[-:.TZ]/)
		.reduce(function(templateString, item, i) {
			return templateString.split(specs[i]).join(item);
		}, template);
}