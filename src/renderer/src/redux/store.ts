import { configureStore } from '@reduxjs/toolkit'
import scheduleIntervalReducer from './slices/scheduleIntervalsSlice'
import candleIntervalsReducer from './slices/candleIntervalsSclice'
import analyseConfigsReducer from './slices/analyseConfigsSlice'
import histogramConfigsReducer from './slices/histogramConfigsSlice'

export const store = configureStore({
  reducer: {
    scheduleIntervals: scheduleIntervalReducer,
    candleIntervals: candleIntervalsReducer,
    analyseConfigs: analyseConfigsReducer,
    histogramConfigs: histogramConfigsReducer
  }
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
