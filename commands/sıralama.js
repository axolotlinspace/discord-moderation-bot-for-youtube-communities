const Discord = require("discord.js") 
const config = require("../config.json")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({
  databasePath:"./data/aboneSayac.json"
});

module.exports = { 
  name: "sıralama", 
  options: [], 
  description: 'En çok abone rol veren yetkililer',
  run: async (client, interaction) => {

    if (!db.all()) return interaction.reply({content: "Hiçbir yetkili abone rol vermemiş."})
    const Teyit = db.all().filter(data => data.ID.startsWith(`aboneSayac-`)).sort((a, b) => b.data - a.data)
    Teyit.length = 10
    let FinalDB = ""

    for (var i in Teyit) {
      FinalDB += `**#${Teyit.indexOf(Teyit[i])+1}** ${client.users.cache.get(Teyit[i].ID.slice(11))}, **${Teyit[i].data}** abone rol verdi.\n`
    }

    const embed = new Discord.MessageEmbed()
    .setTitle("Abone Rol Sıralaması")
    .setDescription(clean(FinalDB))
    .setColor("RED")

    interaction.reply({embeds: [embed], ephemeral: true});

    function clean(text) {
      if (typeof(text) === "string")
      return text
        .replace(/undefined/g, "`Bulunamadı`" + String.fromCharCode(8203));
      else return text;
    };
    
  }
}