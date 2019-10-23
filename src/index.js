const SlackBot = require('slackbots');
const axios = require('axios')

const bot = new SlackBot({
    token: 'xoxb-804776490612-798808756865-zpkEynVEloYm6MIGB0EF6LVB',
    name: 'Fazt App'
});

bot.on('open', () => console.log('Bot is Ready!'))

bot.on('start', () => {
    // bot.postMessageToChannel('general', "I'm alive");
    // bot.postMessageToChannel('general', 'Hello world! :smiley:')
});

bot.on('message', async (data) => {
    if (data.type !== 'message' || data.subtype == 'bot_message' || !data.text) return;

    const args = data.text.split(' ');
    const command = args.splice(1, 1)[0];
    const user_id = args.splice(0, 1)[0];
    const params = args.join(' ');

    console.log({ command, user_id, params });

    if (command === 'movie' && params) {
        try {
            const res = await axios.get(`http://www.omdbapi.com/?t=${params}&i=tt3896198&apikey=6d47e0b7`);
            if (res.data.Response === 'False') return bot.postMessageToChannel('general', 'Movie Not found!');
            bot.postMessageToChannel('general', `${res.data.Title} : ${res.data.Poster}`)
        } catch (e) {
            console.log(e)
        }
    }
});


bot.on('error', (error) => console.log(error))