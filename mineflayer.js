
// Made By github.com/Lehoooo

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')

const bot = mineflayer.createBot({
  host: 'localhost', // server ip
  port: 25565,       // server port 
  username: 'USERNAME', // email goes here for online mode servers - username goes here for offline mode servers
  // password: 'PASSWORD', // if you are using a online mode server
  version: false, // uses version autodetection
  auth: 'mojang'      // optional; by default uses mojang, if using a microsoft account, set to 'microsoft'
})

bot.loadPlugin(pathfinder)
bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)

console.log("bot should be started now")

bot.on('chat', async (username, message) => {
    if (username === bot.username) return
    switch (message) {
      case 'health':
        bot.chat('Checking Health')
        bot.chat(bot.health)
        break

      case 'hunger':
        bot.chat('Checking Hunger')
        bot.chat(bot.food)
        break

      case 'fight': {
        const player = bot.players[username]
        if (!player.entity) {
          bot.chat("I can't see you.")
          return
        }
        bot.chat('Coming to fight you!')
        bot.pvp.attack(player.entity)
      }
      break

      case 'stop':
        bot.chat('ok stopping')
        bot.pvp.stop()
        break

      case (message.match(/^say /) || {}).input:
        console.log("saw the say command '" + message.substring(4) + "'");
        bot.chat(message.substring(4))
        break;
  }
})

bot.on('health', async (username, message) => {
  console.log("health changed. " + bot.health)
  if(bot.health == 0){
    bot.chat(bot.username + ' has died')
  }
})

// log errors
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))
