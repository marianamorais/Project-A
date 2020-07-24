/**
 * O Comando "delete" apagará determinada quantidade de mensagens
 * Apenas quem tem permissão poderá usar esse comando
 */

module.exports = {
  run: (client, message, args) => {
    if (!message.member) return // Verifica se o objeto "member" existe, pode ser que o usuario esteja num chat privado

    /** Verifica se o membro possui permissão para administrar mensagens. */
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('você não tem permissão para usar esse comando!')

    /** Verifica se é a quantidade de argumentos correta
      * Se nenhum argumento for passado então remova 100 mensagens
      * Se 1 argumento for passado então remove esse numero
      * Se mais de um argumento for passado então retorne a mensagem.
      */
    var limit = 100
    if (args.length === 1) {
      limit = parseInt(args[0])
    } else {
      return message.reply(`determine uma quantidade de mensagens para serem excluídas: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
    }

    if (!Number.isInteger(limit)) return message.reply(`determine uma quantidade entre 1 a 200! \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    limit = Math.min(limit, 99)

    message.channel.bulkDelete(limit)
      .then(messages => {
        message.channel.send(`${messages.size} mensagens foram deletadas!`)
          .then(message => setTimeout(() => message.delete(), 2000))
      })
  },

  conf: {
    onlyguilds: true
  },

  get help() {
    return {
      name: 'delete',
      category: 'Moderação',
      description: 'Apaga mensagens de um canal.',
      usage: 'delete [1 - 200]',
      admin: true
    }
  }
}
