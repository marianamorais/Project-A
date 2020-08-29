/**
 * O Comando "sugestion" irá receber a sugestao do membro
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: async function(client, message, args) {

		const msg = args.join(' ');
		if (!msg) {
			message.channel.send(`${message.author}, digite uma sugestão! :mailbox_with_no_mail:`);
			return undefined;
		}

		const embed = new Discord.RichEmbed()
			.setAuthor(`📩 Sugestão de: ${message.author.username}`, message.author.displayAvatarURL)
			.setDescription(`${msg}`)
			.setColor(process.env.COLOR)
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

		client.channels.get(process.env.SUGESTIONCHANNEL).send(embed)
			.then(function(msg) {
				msg.react('👍');
				msg.react('👎');
				message.delete({ timeout: 1000 });
				message.channel.send(`${message.author}, sua sugestão foi enviada em <#737129466484097075> 📬`).then(msg => msg.delete(5000));
			}).catch(function(error) {
				console.log(error);
			});
	},

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'sugestion',
			description: 'Pega a sugestão do usuário.',
			usage: 'sugestion',
		};
	},
};
