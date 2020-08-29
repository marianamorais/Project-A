/**
 * O Comando Help envia uma mensagem de ajuda.
 * Contendo as informações dos comandos.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	run: (client, message) => {
		const commandsArray = [];
		let commands = client.commands;

		console.log(commands);

		if (message.member === null || !message.member.hasPermission('ADMINISTRATOR')) commands = commands.filter(c => !c.help.admin);

		commands.map(command => {
			if (command.alias) return;
			commandsArray.push({
				name: `**!${command.help.name}**`,
				value: `*Descrição*: ${command.help.description}
		    *Categoria*: ${command.help.category}\n`,
			});
		});

		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setDescription('Some description here')
			.addFields(commandsArray)
			.setTimestamp()
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		message.author.send(embed)
			.then(() => message.react('⚡'))
			.catch(() => message.reply('eu não tenho permissões para enviar DM para você 😥'));
	},

	conf: {},

	help: {
		name: 'help2',
		category: 'Ajuda',
		description: 'Mostra todos os comandos disponíveis do bot.',
		usage: 'help2',
	},
};
