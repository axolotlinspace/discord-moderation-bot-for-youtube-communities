const Discord = require("discord.js");
const {Collection} = require("discord.js"),
      {readdirSync} = require("fs");

module.exports = (client, interaction) => {
  client.commands = new Collection() ;
  var files = readdirSync("./commands");
  var props;
  for(var file in files) {
    props = require("./commands/" + files[file]);
    client.commands.set(props.name, props);
    console.log(`/${props.name} is ready.`);
  };
  var allFiles = client.commands.map(a => {
    return {name: a.name, description: a.description, options: a.options};
  });
  client.on("ready", async() => {
    client.application.commands.set(allFiles);
    console.log("Slash (/) commands are working.");
  });
  client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    if (!client.commands.get(interaction.commandName)) return;
    interaction.selectedValue = (interaction.options._hoistedOptions[0]) ? interaction.options._hoistedOptions[0].value : undefined;
    const cmd = client.commands.get(interaction.commandName);
    cmd.run(client, interaction);
  });
};