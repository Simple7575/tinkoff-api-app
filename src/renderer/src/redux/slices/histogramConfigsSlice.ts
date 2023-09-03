import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
// types
import { type IntervalTinkoff, type HistogramConfigs } from '../../../../types/tinkoff'

const initialState = {
  '1m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '2m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '3m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '5m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '10m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '15m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '30m': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '1h': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '2h': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '4h': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '1d': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '7 days': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ],
  '30 days': [
    { index: 'h1', compare: '>' },
    { index: 'h2', compare: '<' },
    { index: 'h3', compare: '<' },
    { index: 'h4', compare: '>' }
  ]
} satisfies HistogramConfigs

type Payload = {
  interval: IntervalTinkoff
  length?: number
  index?: string
}

const storageConfigs = localStorage.getItem('histogram-configs')
const initialConfigs = storageConfigs ? JSON.parse(storageConfigs) : initialState

const histogramConfigs = createSlice({
  name: 'histogramConfigs',
  initialState: initialConfigs as HistogramConfigs,
  reducers: {
    add: (state, action: PayloadAction<Payload>) => {
      const interval = action.payload.interval
      const length = action.payload.length

      // state[interval] = [...state[interval], { index: `h${length + 1}`, compare: '>' }]
      state[interval].push({ index: `h${length + 1}`, compare: '>' })

      localStorage.setItem('histogram-configs', JSON.stringify(current(state)))
    },
    subtract: (state, action: PayloadAction<Payload>) => {
      const interval = action.payload.interval

      state[interval].pop()

      localStorage.setItem('histogram-configs', JSON.stringify(current(state)))
    },
    updateCompare: (state, action: PayloadAction<Payload>) => {
      const interval = action.payload.interval
      const index = action.payload.index!

      state[interval] = state[interval].map((obj) => {
        if (obj.index === index) return { index, compare: obj.compare === '>' ? '<' : '>' }
        else return obj
      })

      localStorage.setItem('histogram-configs', JSON.stringify(current(state)))
    }
  }
})

export const { add, subtract, updateCompare } = histogramConfigs.actions
export default histogramConfigs.reducer
