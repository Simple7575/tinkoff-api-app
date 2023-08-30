import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// types
import { type TDeal, IntervalTinkoff } from '../../../../types/tinkoff'

export const BUY = 'BUY' as const
export const SELL = 'SELL' as const

const initialState = {
  BUY: {
    '1m': BUY,
    '2m': BUY,
    '3m': BUY,
    '5m': BUY,
    '10m': BUY,
    '15m': BUY,
    '30m': BUY,
    '1h': BUY,
    '2h': BUY,
    '4h': BUY,
    '1d': BUY,
    '7 days': BUY,
    '30 days': BUY
  },
  SELL: {
    '1m': BUY,
    '2m': BUY,
    '3m': BUY,
    '5m': BUY,
    '10m': BUY,
    '15m': BUY,
    '30m': BUY,
    '1h': BUY,
    '2h': BUY,
    '4h': BUY,
    '1d': BUY,
    '7 days': BUY,
    '30 days': BUY
  }
}

type InitialState = {
  BUY: {
    [key in IntervalTinkoff]: TDeal
  }
  SELL: {
    [key in IntervalTinkoff]: TDeal
  }
}

type Payload = {
  name: IntervalTinkoff
  deal: TDeal
  dealType: keyof InitialState
}

const storageIntervals = localStorage.getItem('analyse-configs')
const initialIntervals = storageIntervals ? JSON.parse(storageIntervals) : initialState

const analyseConfigsSlice = createSlice({
  name: 'analyseConfigs',
  initialState: initialIntervals as InitialState,
  reducers: {
    update: (state, action: PayloadAction<Payload>) => {
      localStorage.setItem(
        'analyse-configs',
        JSON.stringify({
          ...state,
          [action.payload.dealType]: {
            ...state[action.payload.dealType],
            [action.payload.name]: action.payload.deal
          }
        })
      )

      state[action.payload.dealType][action.payload.name] = action.payload.deal
    }
  }
})

export const { update } = analyseConfigsSlice.actions
export default analyseConfigsSlice.reducer
