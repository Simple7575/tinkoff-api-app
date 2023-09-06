import { CandlesModel } from './schemas/candlesSchema'
import { consoleError } from '../index'
import { readJsonAsync } from '../utils/files'

export const initCandlesFromJson = async () => {
  try {
    const tickersAndClasscodes = await readJsonAsync('tickersAndClasscodes')

    for (const tickersAndClasscode of tickersAndClasscodes) {
      const existingCandle = await CandlesModel.findOne({ ticker: tickersAndClasscode.ticker })
      if (existingCandle) {
        console.log('exists')
        continue
      }
      const newCandle = new CandlesModel({
        ticker: tickersAndClasscode.ticker,
        candles: {
          '1m': []
        }
      })

      await newCandle.save()
    }
  } catch (error) {
    consoleError(error)
  }
}
