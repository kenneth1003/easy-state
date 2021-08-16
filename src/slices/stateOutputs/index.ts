import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '@/store'

type StateOutput = {
  stateOutputId: string;
  title: string;
  order: number;
}
// output
// outputs
export const stateOutputsAdapter = createEntityAdapter<StateOutput>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (stateOutput) => stateOutput.stateOutputId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.order - b.order,
})

const stateOutputsSlice = createSlice({
  name: 'stateOutputs',
  initialState: stateOutputsAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    stateOutputUpdated: stateOutputsAdapter.updateOne,
    stateOutputAdded: stateOutputsAdapter.addOne,
    stateOutputRemoveOne: stateOutputsAdapter.removeOne,
    stateOutputsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      return stateOutputsAdapter.setAll(state, action.payload.stateOutputs)
    },
  },
})




export const stateOutputSelector = stateOutputsAdapter.getSelectors<RootState>((state: RootState) => {
  return state.stateOutputs
})


export const {
  stateOutputUpdated,
  stateOutputAdded,
  stateOutputRemoveOne,
  stateOutputsReceived
} = stateOutputsSlice.actions
export default stateOutputsSlice.reducer

