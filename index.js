const Discord = require("discord.js");
/*const INTENTS = Object.entries(Discord.Intents.FLAGS).filter(([K]) => !["GUILD_PRESENCES", "GUILD_MEMBERS"].includes(K)).reduce((t, [, V]) => t | V, 0);
const client = new Discord.Client({ intents: INTENTS });*/
const client = new Discord.Client({ intents: 98303 })
client.commands = new Discord.Collection();
require("./bot.js")(client);
const config = require("./config.json");
const { Database } = require("nukleon");

const express = require("express");
const app = express();
app.get('/', (request, response) => {
  console.log('Pong!');
  response.sendStatus(200);
});
app.listen(process.env.PORT);

client.login(process.env.token).catch(err => {console.log("Token is invalid.")});

client.on('interactionCreate', interaction => {
  
	if (!interaction.isButton()) return;
	if (interaction.customId == "kayit_buton") {

    if (interaction.member.roles.cache?.has(config.uyeRol)) {
      
      interaction.member.roles.remove(config.uyeRol)
      interaction.reply({ content: `Sunucudan kaydın silindi.`, ephemeral: true });
      
    } else {
      
      interaction.member.roles.add(config.uyeRol)
      interaction.reply({ content: `Sunucuya başarıyla kayıt oldun!`, ephemeral: true });
      
    }
    
  } else if (interaction.customId == "normalkodlar_buton") {

    if (interaction.member.roles.cache?.has(config.normalKodlar)) {
      
      interaction.member.roles.remove(config.normalKodlar)
      interaction.reply({ content: `<@&${config.normalKodlar}> rolün alındı, tekrar almak için butona yeniden bas.`, ephemeral: true });
      
    } else {
      
      interaction.member.roles.add(config.normalKodlar)
      interaction.reply({ content: `<@&${config.normalKodlar}> rolün verildi, artık kodlara erişebilirsin!`, ephemeral: true });
      
    }
    
  } else return;
  
});