/**
 * O Comando "serverinfo" mostrará informações do servidor
*/

const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = {

  run: function (client, message, args) {
    const joined = message.member.joinedAt

    const region = {
      brazil: ':flag_br: Brazil'
    }

    function checkBots(guild) {
      let botCount = 0;
      guild.members.forEach(member => {
        if (member.user.bot) botCount++;
      });
      return botCount;
    }

    function checkUsers(guild) {
      let memberCount = 0;
      guild.members.forEach(member => {
          if (member.user) memberCount++
      });
      return memberCount;
    }

    const embed = new Discord.RichEmbed()
      .setColor("#74c1ff") //Cor      
      // .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} - Informações 🔍`, message.guild.iconURL)
      .addField(`**🧾 Nome do servidor**`, message.guild.name)
      .addField(`**👑 Dono do servidor(a)**` , `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField('**🌎 Região do servidor**', region[message.guild.region], true)
      .addField('💬 Total de salas', message.guild.channels.size, true)
      .addField('👤 Usuários', checkUsers(message.guild), true)
      .addField('🤖 Bots', checkBots(message.guild), true)
      .addField('💼 **Total de cargos**', message.guild.roles.size, true)
      .addField('📅 **Servidor criado em**', moment(message.guild.createdAt).format("D MMMM YYYY, h:mm:ss"))
      .addField('🙌🏻 ** Você no servidor entrou em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined), true)
      .setFooter("2020 © Liga dos Programadores", "https://i.imgur.com/Mu4KEVh.png?width=5000,height=100", dynamic= true, size= 256)
      .setTimestamp()

    // Aqui sera enviado o embed no canal que o usuário executo o comando
    message.channel.send(embed)
  },
  /**
   * Aqui podemos colocar mais algumas configurações do comando.
   */
  conf: {}, 
}

/**
  * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
*/

exports.help = {
  name: 'serverinfo',
  description: 'Verifica as informações do servidor',
  usage: 'serverinfo',
  aliases: ['server']
};

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}