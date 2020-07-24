/**
 * O Comando "botinfo" mostrará informações do bot.
*/

const Discord = require('discord.js')
const moment = require('moment')

moment.locale('pt-br')

module.exports = {

  run: function (client, message, args) {
    const botAvatar = client.user.displayAvatarURL
    const date = client.user.createdAt
    const botName = client.user.username

    const totalSeconds = (client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const uptime = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;

    const codigoFonte = "https://github.com/Liga-dos-Programadores/Project-A";
   
    const embed = new Discord.RichEmbed()
      .setColor("#74c1ff") //Cor
      .setThumbnail(botAvatar)
      .setAuthor('🤖 Minhas informações')
      .addField('🧾 **Meu nome**', botName)
      .addField('🟢 **Estou online a**', uptime)
      .addField('🎉 **Fui criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date), true)
      .addField('🔗 **Meu código fonte**', codigoFonte)
      .setFooter("2020 © Liga dos Programadores", "https://i.imgur.com/Mu4KEVh.png?width=5000,height=100", dynamic= true, size= 256)
      .setTimestamp()

    message.channel.send(embed)
  },

  conf: {},
}

exports.help = {
  name: 'botinfo',
  description: 'Informação sobre o Bot',
  usage: 'botinfo',
  aliases: ['bot']
}

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}
