# VIBEZ
A Musicbot for Discord using the Discord.js NodeJS module

My main goal is to make a working musicbot with my fresh knowledge of Javascript.

To do:
--
- Stop Music
- Play Music on multiple servers at once

Features I want to make for the Bot:
--
- Website for the MusicBot (where you can edit music queue and add music in the queue)
- Android app for the MusicBot (where you can edit music queue and add music in the queue)

Modules used:
--
- Discord.JS
- play-dl

You can clone this repo and start the bot for your own server:
--
- Create a config.json file with the following template:

```
{
  "clientId": "<your bot's client id>",
  "guildId": "<your discord server's id>",
  "token": "your discord bot token"
}
```
Server ID is required for the deploy-commands.js, which makes the slash commands visible for the server (this will be automatic in the future, but right now idk how to do it)
- run the deploy-commands.js with ```node deploy-commands.js```
- Start the bot with ```node .```



I started this project at May 31st, 2022
