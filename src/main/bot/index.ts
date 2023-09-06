import { Bot } from 'grammy'
import { readJsonAsync } from '../utils/files.js'

export const sendMessage = async (message: string) => {
  try {
    const { botToken, chatID } = await readJsonAsync('credentials')

    const bot = new Bot(botToken)

    await bot.api.sendMessage(chatID, message)
  } catch (error) {
    console.log(error)
  }
}
