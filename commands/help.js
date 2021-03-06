/**
 * O Comando Help envia uma mensagem de ajuda.
 * Cotendo comandos e outras informações.
 */

module.exports = {
  run: (client, message, args) => {
    /** Objeto embed que irá ser enviado. */
    let embed = {
      color: 0xB1103C,
      title: 'PROJECT: A',
      url: 'https://github.com/Liga-dos-Programadores/Project-A',
      description: `***Lista de comandos*** 🤖`,
      footer: {
        text: 'Não se esqueça de checar nosso código-fonte | 2020 ®Liga dos Programadores'
      },
      fields: []
    }

    client.commands.forEach(command => {
      if (command.alias) return
      embed.fields.push(
        {
          name: `**${command.help.name}**`,
          value: `**Descrição**: ${command.help.description}\n**Como Usar**: ${process.env.PREFIX}${command.help.usage}`
        }
      )
    })

    message.author.send({ embed: embed })
      .then(() => message.react('⚡'))
      .catch(() => message.reply(`eu não tenho permissões para enviar DM para você 😥`))
  },

  conf: {},

  help: {
    name: 'help',
    aliases: ['ajuda'],
    category: 'Help',
    description: 'Mostra todos os comandos disponíveis.',
    usage: 'help'
  }
}
