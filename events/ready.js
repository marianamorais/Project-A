/**
  * Evento ready é disparado assim que o bot é conectado ao Discord
*/

const status = require('../utils/status');

exports.name = 'ready';
exports.run = (client) => {
	status.run(client);

	console.log(`O bot foi iniciado com ${client.users.size} usuarios em ${client.guilds.size} servidores`);
};
