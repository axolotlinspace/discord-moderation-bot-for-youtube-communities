const Discord = require("discord.js") 
const config = require("../config.json")
const ms = require("ms")

module.exports = { 
  name: "clear", 
  options: [
    {          
      name: 'sayı',
      description: 'Silinecek mesaj sayısı',
      type: 'INTEGER',
      required: true
    }
  ], 
  description: 'Mesaj sil',
  userPermissions: ["MANAGE_MESSAGES"],
  run: async (client, interaction) => {

    const amount = interaction.options.getInteger('sayı');

    if (amount > 100) return interaction.reply({content: "En fazla 100 mesaj silebilirsin.", ephemeral: true})

    const msgs = await interaction.channel.messages.fetch({ limit: amount, })

    const filtered = msgs.filter(msg => Date.now() - msg.createdTimestamp < ms("14 days"))

    await interaction.channel.bulkDelete(filtered)

    interaction.reply({content: `${filtered.size} mesaj silindi.`})
    
  }
}