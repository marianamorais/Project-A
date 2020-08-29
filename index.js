// Se o Node estiver desatualizado uma mensagem será mostrada.
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 ou mais atualizado é necessário. Por favor atualize o Node! :).');

// O arquivo .env mais os dados do mesmo será necessário para que a conexão ocorra.
require('dotenv').config();

// Conexão padrão com Discord
const Discord = require('discord.js');
// O bot é o client
const client = new Discord.Client();
const c = require('colors');
const fileUtils = require('./utils/fileUtils');

client.Discord = require('discord.js');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function start() {
	console.log(c.blue('Carregando comandos ...'));
	loadCommands('./commands');

	console.log(c.blue('Carregando eventos...'));
	loadEvents('./events');

	console.log(c.blue('Conectando o bot ...'));
	client.login(process.env.AUTH_TOKEN);
}

/**
 * Load all commands in a specific directory.
 *
 * @param {string} dir - The commands directory.
*/

function loadCommands(dir) {
	for (const dirInfo of fileUtils.searchByExtension(dir, 'js')) {
		const dirList = dirInfo.directory.split('/');
		dirList.shift();
		dirList.shift();
		const commandCategory = dirList
			.join('/');

		for (const file of dirInfo.files) {
			const cmd = require(file);
			if (!cmd.help) {
				// Invalid command.
				continue;
			}

			client.commands.set(cmd.help.name, cmd);
			if (cmd.help.aliases) {
				cmd.help.aliases
					.filter(alias => alias.trim() !== '')
					.forEach(alias => client.aliases.set(alias, cmd.help.name));
			}
		}

		const formatedFiles = dirInfo.files.map(file => file.split('/').pop().split('.').shift());
		console.log('[COMANDO] ' + c.yellow('Foram carregados ') + dirInfo.files.length + c.yellow(' comandos na categoria ') + commandCategory + c.yellow('. [') + formatedFiles.join(c.yellow(', ')) + c.yellow(']'));
	}
}

/**
* Load all events in a specific directory.
*
* @param {string} dir - The events directory.
*/
function loadEvents(dir) {
	for (const dirInfo of fileUtils.searchByExtension(dir, 'js')) {
		for (const file of dirInfo.files) {
			let events = require(file);
			if (!Array.isArray(events)) {
				events = [events];
			}

			for (const event of events) {
				if (!event.name || !event.run) {
					continue;
				}

				console.log('[EVENTO] ' + c.yellow('O evento ') + event.name + c.yellow(' foi carregado!'));

				client.on(event.name, (...args) => event.run(client, ...args));
			}
		}
	}
}

start();

// const cmdFiles = readdirSync('./commands/')
// console.log('log', `Carregando o total de ${cmdFiles.length} comandos.`)

// cmdFiles.forEach(f => {
//   try {
//     const props = require(`./commands/${f}`)
//     if (f.split('.').slice(-1)[0] !== 'js') return

//     console.log('log', `Carregando comando: ${props.help.name}`)

//     if (props.init) props.init(client)

//     client.commands.set(props.help.name, props)
//     if (props.help.aliases) {
//       props.alias = true
//       props.help.aliases.forEach(alias => client.commands.set(alias, props))
//     }
//   } catch (e) {
//     console.log(`Impossivel executar comando ${f}: ${e}`)
//   }
// })

// const evtFiles = readdirSync('./events/')
// console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
// evtFiles.forEach(f => {
//   const eventName = f.split('.')[0]
//   const event = require(`./events/${f}`)

//   client.on(eventName, event.bind(null, client))
// })

// client.login(process.env.AUTH_TOKEN)