const Discord = require("discord.js") 
const config = require("../config.json")
const ms = require("ms")

module.exports = { 
  name: "kick", 
  options: [
    {          
      name: 'user',
      description: 'Atılacak üye',
      type: 'USER',
      required: true
    },
    {          
      name: 'reason',
      description: 'Atılma sebebi',
      type: 'STRING',
      required: true
    }
  ], 
  description: 'Üyeyi sunucudan at',
  userPermissions: ["KICK_MEMBERS"],
  run: async (client, interaction) => {

    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (target.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({content: "Bu üye seninle eşit ya da daha yüksek konumda.", ephemeral: true})

    target.send(`**${interaction.guild.name}** adlı sunucudan **${reason}** sebebiyle atıldın.`).catch(err => {})
    target.kick(reason).catch(err => {interaction.followUp({content: "Üye atılamadı.", ephemeral: true})})
    interaction.reply({content: `🥾 **${target.user.tag}** sunucudan atıldı.`})
    
  }
}