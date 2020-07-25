/**
 * O Comando "invite" mostra quem criou o convite e a quantidade usada.
*/

const { RichEmbed } = require('discord.js')
module.exports = {

    /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
     * Que passará os argumentos atraves do middleware que programamos.
    */

    run: function (client, message, args) {
        message.guild.fetchInvites()
            .then(invites => {
                if (!invites) {
                  return message.channel.send(`> ${message.author}, esse servidor não possui convites!`)
                };
                const rank = invites.array().sort((a, b) => b.uses - a.uses).slice(0, 5)

                if(!rank.length) return message.channel

                const embed = new RichEmbed()
                    .setAuthor(`Convites | ${message.guild.name}`, client.user.avatarURL)
                    .setThumbnail(message.guild.iconURL)
                    rank.map((user, index) => embed.addField('⠀⠀⠀⠀', `**${index + 1}º** ${user.inviter.username} \`\`\`Convidados: ${user.uses}\`\`\` **Link do convite**: ${user.url}`, false))
                embed.addField('Total/Convites', `\`\`\`${invites.size} convites\`\`\``, true)
                    .setColor("#74c1ff")
                    .setFooter(`2020 © Liga dos Programadores.`)
                    .setTimestamp()
                    
                message.channel.send(embed)
            })
            .catch(() => { });
    },

    conf: {},

    /**
     * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
     */
    get help() {
        return {
            name: 'invite',
            category: 'Info',
            description: 'Mostra quem criou o convite e a quantidade usada.',
            usage: 'invite'
        }
    }
}