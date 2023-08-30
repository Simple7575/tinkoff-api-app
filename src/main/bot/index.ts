import { Bot } from 'grammy'
import { CHAT_ID } from '../envConstants.js'
import { readJsonAsync } from '../utils/files.js'

export const sendMessage = async (message: string) => {
  try {
    const credentials = await readJsonAsync('credentials')

    console.log('send message needs to be tested')

    // const bot = new Bot(BotToken)

    // if (!CHAT_ID) throw new Error('Chat ID needed.')

    // await bot.api.sendMessage(CHAT_ID, message)
  } catch (error) {
    console.log(error)
  }
}
