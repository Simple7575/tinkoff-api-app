export const IntervalMapTinkoff = {
  '1m': { interval: 'CANDLE_INTERVAL_1_MIN', from: '-1d' },
  '2m': { interval: 'CANDLE_INTERVAL_2_MIN', from: '-1d' },
  '3m': { interval: 'CANDLE_INTERVAL_3_MIN', from: '-1d' },
  '5m': { interval: 'CANDLE_INTERVAL_5_MIN', from: '-1d' },
  '10m': { interval: 'CANDLE_INTERVAL_10_MIN', from: '-1d' },
  '15m': { interval: 'CANDLE_INTERVAL_15_MIN', from: '-1d' },
  '30m': { interval: 'CANDLE_INTERVAL_30_MIN', from: '-2 days' },
  '1h': { interval: 'CANDLE_INTERVAL_HOUR', from: '-7 days' },
  '2h': { interval: 'CANDLE_INTERVAL_2_HOUR', from: '-30 days' },
  '4h': { interval: 'CANDLE_INTERVAL_4_HOUR', from: '-30 days' },
  '1d': { interval: 'CANDLE_INTERVAL_DAY', from: '-1y' },
  '7 days': { interval: 'CANDLE_INTERVAL_WEEK', from: '-2y' },
  '30 days': { interval: 'CANDLE_INTERVAL_MONTH', from: '-10y' }
}

export const IntervalToMsMap = {
  '1m': 60000,
  '2m': 120000,
  '3m': 180000,
  '5m': 300000,
  '10m': 600000,
  '15m': 900000,
  '30m': 1.8e6,
  '1h': 3.6e6,
  '2h': 7.2e6,
  '4h': 1.44e7,
  '1d': 8.64e7,
  '7 days': 6.048e8,
  '30 days': 2.592e9
}

export const intervalsToSchedulMap = {
  '1m': '*/1 * * * *', // At every 1th min.
  '2m': '*/2 * * * *', // At every 2 min.
  '3m': '*/3 * * * *', // At every 3 min.
  '5m': '*/5 * * * *', // At every 5th min.
  '10m': '*/10 * * * *', // At every 10th min.
  '15m': '*/15 * * * *', // At every 15th min.
  '30m': '*/30 * * * *', // At every 30th min.
  '1h': '0 * * * *', // At every hour.
  '2h': '0 */2 * * *', // At every 2 hrs.
  '4h': '0 */4 * * *', // At every 4th hr.
  '1d': '50 1 * * *', // Every day at 1:50AM.
  '7 days': '0 0 * * 0', // At every weekend.
  '30 days': '0 0 1 * *' // At 00:00 on day-of-month 1.
}
