const { RichEmbed } = require('discord.js');

/**
* O Comando "movemessage" vai mover uma mensagem do usuário de uma sala até outra, e em seguida apagar. Para sempre manter as conversas organizadas em suas salas
*/

module.exports = {
	/**
      * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
      * Que passará os argumentos atraves do middleware que programamos.
      */
	run: function(client, message, args) {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('você não tem permissão para usar esse comando!');

		// Criando embed que será enviado para o usuário
		const embed = new RichEmbed();
		// buscando a mensagem que o bot vai mover
		message.channel.fetchMessage(args[0])
			.then(msg => {
				// atribuindo a mensagem ao embed
				embed.setAuthor(msg.author.username, msg.author.avatarURL)
					.setDescription(msg.content)
					.setTimestamp();

				// buscando o canal onde vai ser reposto
				client.channels.find('id', args[1])
					// enviando para o canal destino
					.send(`${msg.author} sua mensagem foi movida para esta sala!`, embed);

				// deletando a mensagem no canal antigo
				msg.delete()
					.then(m => console.log(`Mensagem de ${m.author.username} movida`))
					.catch(err => console.warn(err));
			})
			// caso o bot encontre algum problema
			.catch(err => {
				message.channel.send('Ops, foi digitado algo errado! Tente novamente...');
				console.warn(err);
			});
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
			name: 'movemessage',
			category: 'Moderação',
			description: 'Acão de movimento de mensagem para organização.',
			usage: 'movemessage',
		};
	},
};
