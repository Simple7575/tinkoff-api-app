import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  '1m': false,
  '2m': false,
  '3m': false,
  '5m': false,
  '10m': false,
  '15m': false,
  '30m': false,
  '1h': false,
  '2h': false,
  '4h': false,
  '1d': false,
  '7 days': false,
  '30 days': false
}

type InitialState = {
  [key in keyof typeof initialState]: boolean
}

const storageIntervals = localStorage.getItem('schedule-intervals')
const initialIntervals = storageIntervals ? JSON.parse(storageIntervals) : initialState

const scheduleIntervalsSlice = createSlice({
  name: 'scheduleIntervals',
  initialState: initialIntervals as InitialState,
  reducers: {
    update: (state, action: PayloadAction<keyof typeof initialState>) => {
      localStorage.setItem(
        'schedule-intervals',
        JSON.stringify({ ...state, [action.payload]: !state[action.payload] })
      )

      state[action.payload] = !state[action.payload]
    }
  }
})

export const { update } = scheduleIntervalsSlice.actions
export default scheduleIntervalsSlice.reducer
