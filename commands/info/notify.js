/**
 * O Comando "notify" adiciona o cargo de "Novidades" aos membros.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passara os argumentos atraves do middleware que programamos.
  */

	run: (client, message) => {

		/** Verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */

		const role = message.guild.roles.get(process.env.NOTIFYROLE);

		if (!role) {
			const notifyEmbed1 = new Discord.RichEmbed()
				.setColor(process.env.COLOR)
				.setAuthor('Esse cargo não existe no servidor!')
				.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
				.setTimestamp();
			message.channel.send(notifyEmbed1);
		}
		else if (!message.member.roles.has(role.id)) {
			message.member.addRole(role.id);

			const notifyEmbed2 = new Discord.RichEmbed()
				.setColor(process.env.COLOR)
				.setAuthor('Adicionou cargo novidades 🔔')
				.setDescription('*Agora você receberá notificações quando houver notícias da comunidade!*')
				.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
				.setTimestamp();

			message.channel.send(notifyEmbed2);
		}
		else {
			message.member.removeRole(role.id);

			const notifyEmbed3 = new Discord.RichEmbed()
				.setColor(process.env.COLOR)
				.setAuthor('Removeu cargo novidades 🔕')
				.setDescription('*Voce removeu o cargo, não irá receber mais notificações da comunidade.*')
				.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
				.setTimestamp();

			message.channel.send(notifyEmbed3);
		}
	},

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
   */

	get help() {
		return {
			name: 'notify',
			description: 'O Comando "notify" adiciona o cargo de "Novidades" aos membros.',
			usage: 'notify',
		};
	},
};