
import {
  configureStore,
} from '@reduxjs/toolkit'
import stateParentReducer from '@/slices/stateParents';

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    stateParents: stateParentReducer,
  },
})

export default store
