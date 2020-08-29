/**
 * O Comando "userinfo" mostrará informações do usuário.
*/

const Discord = require('discord.js');
const moment = require('moment');

moment.locale('pt-br');
require('dotenv').config();

const status = {
	online: ' `🟢` Online',
	idle: ' `🟠` Ausente',
	dnd: ' `🔴` Ocupado(a)',
	offline: ' `⚫️` Offline/Invisível',
};

module.exports = {
	run: function(client, message, args) {
		const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
		const target = message.mentions.users.first() || message.author;
		const bot = member.user.bot ? '`🤖` É um bot' : ' `👤` Não é um bot';

		const embed = new Discord.RichEmbed()
			.setThumbnail(target.displayAvatarURL)
			.setColor(process.env.COLOR)
			.setDescription(`🔍 **Informações de: ** <@${member.user.id}>`)
			.addField('📄  **Apelido**', `${member.nickname !== null ? `Nickname: ${member.nickname}` : 'Nenhum'}`, true)
			.addField('❔  **É um bot?**', `${bot}`, true)
			.addField('⚪️ **Status**', `${status[member.user.presence.status]}`, true)
			.addField('🎮 **Jogando**', `${member.user.presence.game ? `${member.user.presence.game.name}` : ' Nada'}`, true)
			.addField(`💼 **Cargo(s)** [${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(' **|** ') || 'Nenhum cargo'}`)
			.addField('**🎉 Entrou no Discord em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt), true)
			.addField('**🙌 Entrou no servidor em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt), true)
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

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
			name: 'userinfo',
			description: 'Verifica as informações de um usuário',
			usage: 'userinfo <NICK>',
			aliases: ['user'],
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
	return date
		.toISOString()
		.split(/[-:.TZ]/)
		.reduce(function(template, item, i) {
			return template.split(specs[i]).join(item);
		}, template);
}