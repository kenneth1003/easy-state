import {
  combineReducers
} from '@reduxjs/toolkit'

import stateParentReducer from '@/slices/stateParents';
import stateOutputReducer from '@/slices/stateOutputs';

export const rootReducer = combineReducers({
  stateParents: stateParentReducer,
  stateOutputs: stateOutputReducer
})
