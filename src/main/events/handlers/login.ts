import { Bot } from 'grammy'
import { IpcMainEvent } from 'electron'
import { TinkoffInvestApi, TinkoffApiError } from 'tinkoff-invest-api'
import { CandleInterval } from 'tinkoff-invest-api/cjs/generated/marketdata'
import { writeJsonAsync } from '../../utils/files'
import mongoose from 'mongoose'
// types
import { TCredentials } from '../../../types/tinkoff'

const checkTinkoffApiToken = async (token: string) => {
  try {
    const api = new TinkoffInvestApi({ token })

    const { candles } = await api.marketdata.getCandles({
      figi: 'BBG00QPYJ5H0',
      interval: CandleInterval.CANDLE_INTERVAL_1_MIN,
      ...api.helpers.fromTo('-5m')
    })
  } catch (error) {
    if (error instanceof TinkoffApiError) {
      if (error.details === 'authentication token is missing or invalid')
        throw new Error('Tinkoff token is invalid.')
    }
  }
}

const checkBotToken = async (token: string): Promise<true | void> => {
  try {
    const bot = new Bot(token)

    await bot.init()
  } catch (error) {
    console.error(error)
    throw new Error('Bot token is invalid.')
  }
}

const checkDBUri = async (URI: string) => {
  try {
    const db = await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    })
  } catch (error) {
    console.error(error)
    throw new Error('DB URI is invalid.')
  }
}

export const loginHandler = async (event: IpcMainEvent, data: TCredentials) => {
  const { tinkoffApiToken, botToken, dbUri, chatID } = data
  const [isTinkoffTokenValid, isBotTokenValid, isDBUriValid] = await Promise.allSettled([
    checkTinkoffApiToken(tinkoffApiToken),
    checkBotToken(botToken),
    checkDBUri(dbUri)
  ])

  if (isTinkoffTokenValid.status === 'rejected') {
    event.reply('login-error', { error: isTinkoffTokenValid.reason })
  }
  if (isBotTokenValid.status === 'rejected') {
    event.reply('login-error', { error: isBotTokenValid.reason })
  }
  if (isDBUriValid.status === 'rejected') {
    event.reply('login-error', { error: isDBUriValid.reason })
  }
  if (
    isTinkoffTokenValid.status === 'rejected' ||
    isBotTokenValid.status === 'rejected' ||
    isDBUriValid.status === 'rejected'
  )
    return

  await writeJsonAsync('credentials', { tinkoffApiToken, botToken, dbUri, chatID })

  event.reply('login-success', { tinkoffApiToken, botToken, dbUri, chatID })
}
