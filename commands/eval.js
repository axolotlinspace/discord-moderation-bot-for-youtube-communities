const Discord = require("discord.js") 
const {MessageActionRow, MessageButton} = require("discord.js") 
const { Database } = require("nukleon")
const fs = require("fs")
const config = require("../config.json")

module.exports = { 
  name: "evaluate", 
  options: [
    {          
      name: 'code',
      description: 'Çalıştırılacak kod',
      type: 'STRING',
      required: true
    }
  ], 
  description: 'Kod çalıştır',
  run: async (client, interaction) => {

if (!config.owners.includes(interaction.user.id)) return;
    
try {
  var kod = interaction.options.getString('code');
  if (!kod) return
  var evaled = eval(kod);
  if (typeof evaled !== "string")
  evaled = require("util").inspect(evaled);
  interaction.reply({content: `**Girdi:** \`\`\`js\n ${kod} \n\`\`\` **Çıktı:** \`\`\`js\n ${clean(evaled)} \n\`\`\``, ephemeral: true});      
} catch (err) {
  interaction.reply({content: `**Hata:** \`\`\`js\n ${clean(err)} \n\`\`\``, ephemeral: true});
};
  function clean(text) {
    if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
  } 
} 