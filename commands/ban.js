const Discord = require("discord.js") 
const config = require("../config.json")
const ms = require("ms")

module.exports = { 
  name: "ban", 
  options: [
    {          
      name: 'user',
      description: 'Yasaklanacak üye',
      type: 'USER',
      required: true
    },
    {          
      name: 'reason',
      description: 'Yasaklanma sebebi',
      type: 'STRING',
      required: true
    }
  ], 
  description: 'Üyeyi sunucudan yasakla',
  userPermissions: ["BAN_MEMBERS"],
  run: async (client, interaction) => {

    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (target.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({content: "Bu üye seninle eşit ya da daha yüksek konumda.", ephemeral: true})

    target.send(`**${interaction.guild.name}** adlı sunucudan **${reason}** sebebiyle yasaklandın.`).catch(err => {interaction.followUp({content: "Üyeye mesaj gönderilemedi.", ephemeral: true})})
    target.ban({reason}).catch(err => {interaction.followUp({content: "Üye yasaklanamadı.", ephemeral: true})})
    interaction.reply({content: `🛫 **${target.user.tag}** sunucudan yasaklandı.`})
    
  }
}