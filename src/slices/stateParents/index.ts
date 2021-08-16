import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '@/store'

enum StateParentType {}

export type StateParent = {
  stateParentId: string;
  title: string;
  order: number;
  states: string[];
  type?: StateParentType;
}

export const stateParentsAdapter = createEntityAdapter<StateParent>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (stateParent) => stateParent.stateParentId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.order - b.order,
})

const stateParentsSlice = createSlice({
  name: 'stateParents',
  initialState: stateParentsAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    stateParentUpdated: stateParentsAdapter.updateOne,
    stateParentAdded: stateParentsAdapter.addOne,
    stateParentRemoveOne: stateParentsAdapter.removeOne,
    stateParentsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      return stateParentsAdapter.setAll(state, action.payload.stateParents)
    },
  },
})




export const stateParentSelector = stateParentsAdapter.getSelectors<RootState>((state: RootState) => {
  return state.stateParents
})


export const {
  stateParentAdded,
  stateParentUpdated,
  stateParentRemoveOne,
  stateParentsReceived
} = stateParentsSlice.actions
export default stateParentsSlice.reducer

