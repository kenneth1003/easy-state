import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  stateParentAdded,
  stateParentUpdated,
  stateParentRemoveOne,
  stateParentSelector
} from '@/slices/stateParents';

import { useCallback, useState } from 'react';
import { genStateParentId } from '@/utils';
import { ListItemType } from '@/components/ListItem';
import Tag from '@/components/Tag';
import { ItemTitle } from '@/components/BlockInfo';

import {TextInput, Button, ListItem} from '@/components';
import { RootState } from '@/store';

const Wrap = styled.div`
  padding: 16px;
`

const StateParentWrap = styled.div<{ active: boolean }>`
  border-left: ${({ active, theme }) => active ? '3px solid #fff' : ''};
  padding: ${({ active }) => active ? '8px' : ''};
`

const InputForm = styled.div`
  display: flex;
`

const StateList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

enum InputMode {
  StateParentEdit = 'StateParentEdit',
  StateParentAdd = 'StateParentAdd',
  StateAdd = 'StateAdd',
  StateEdit = 'StateEdit',
}

const DEFAULT_INPUT_MODE = InputMode.StateParentAdd

const SideNav = () => {
  const [inputMode, setInputMode] = useState(InputMode.StateParentAdd)
  const [activeStateParentIdx, setActiveStateParentIdx] = useState(0);
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateParentMap = useSelector(stateParentSelector.selectEntities);
  const allNames = allStateParent.map(({ title }: any) => title);
  const allIds = allStateParent.map(({ stateParentId }: any) => stateParentId);
  const activeStateParentId = allIds[activeStateParentIdx]
  console.log("🚀 ~ file: index.tsx ~ line 55 ~ SideNav ~ allIds", allIds)
  // const allStateParentIds = useSelector(stateParentSelector.);

  const removeState = useCallback((stateParentId: string, idxToRemove: number) => {
    const stateParent = allStateParentMap[stateParentId];
    const states = stateParent?.states || []
    const action = stateParentUpdated({
      id: stateParentId,
      changes: {
        states:[...states.slice(0, idxToRemove), ...states.slice(idxToRemove + 1)]
      }
    })
    dispatch(action)
  }, [allStateParentMap, dispatch])

  const removeStateParent = useCallback((stateParentId: string) => {
    const action = stateParentRemoveOne(stateParentId)
    dispatch(action)
  }, [dispatch])

  const addStateParent = useCallback(() => {
    if (allNames.includes(inputText)) {
      return alert('Name should be unique')
    }
    const id = genStateParentId()
    const action = stateParentAdded({
      order: 0,
      title: inputText,
      stateParentId: id,
      states: []
    })
    dispatch(action)
    setActiveStateParentIdx(allIds.length);
    setInputMode(InputMode.StateAdd)
  }, [dispatch, inputText])

  const addState = useCallback((id) => {
    const stateParent = allStateParentMap[activeStateParentId];
    if (stateParent?.states.includes(inputText)) {
      return alert('State should be unique')
    }
    const action = stateParentUpdated({
      id,
      changes: {
        states:[...(stateParent?.states || []), inputText]
      }
    })
    dispatch(action)
  }, [activeStateParentId, allStateParentMap, dispatch, inputText])

  const editState = useCallback((stateParentId: string, idxToEdit: number, text: string) => {
    const i = idxToEdit;
    const stateParent = allStateParentMap[stateParentId];
    const states = stateParent?.states || []
    if (states.includes(text)) {
      return alert('State should be unique')
    }
    const action = stateParentUpdated({
      id: stateParentId,
      changes: {
        states:[...states.slice(0, i), text,...states.slice(i + 1)]
      }
    })
    dispatch(action)
  }, [allStateParentMap, dispatch])

  const editStateParent = useCallback((stateParentId: string, text: string) => {
    if (allNames.includes(text)) {
      return alert('Name should be unique')
    }
    const action = stateParentUpdated({
      id: stateParentId,
      changes: {
        title: text
      }
    })
    dispatch(action)
  }, [dispatch])

  const submit = useCallback(() => {
    console.log('inputText:', inputText);
    if (!inputText) return
    console.log('inputMode:', inputMode);

    if (inputMode === InputMode.StateParentAdd) {
      addStateParent()
    } else if (inputMode === InputMode.StateAdd) {
      addState(activeStateParentId)
    }
  }, [inputText, inputMode, addStateParent, addState, activeStateParentId])

  return (
    <Wrap>
      {/* { inputMode } */}
      <InputForm>
        <TextInput
          placeholder={
            inputMode === InputMode.StateAdd
              ? "Add state type... ex: UserStatue, SystemStatus"
              : "Add State... ex: Login, Not Login, Error"
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={() => {
            setInputMode(DEFAULT_INPUT_MODE)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit()
              setInputText('')
            } else if (e.key === 'Escape') {
              setInputMode(DEFAULT_INPUT_MODE)
            } else if (e.key === 'Tab') {
              e.preventDefault();
              setInputMode(InputMode.StateAdd)
              const idx = inputMode !== InputMode.StateAdd
                ? 0
                : (activeStateParentIdx + 1) % allIds.length
              setActiveStateParentIdx(idx)
            }
          }}
          type="text"
        />
      </InputForm>
      {
        allStateParent.map(({ title, states, stateParentId }, i) => (
          <StateParentWrap
            active={ activeStateParentId === stateParentId && inputMode === InputMode.StateAdd }
            onClick={() => {
              setActiveStateParentIdx(i)
              setInputMode(InputMode.StateAdd)
            }
          }>
            <ListItem
              title={title}
              onDelete={ () => {
                if (window.confirm('Are you sure to remove?')){
                  removeStateParent(stateParentId)
                }
              }}
              onSubmit={ (text: string) => editStateParent(stateParentId, text) }
              renderer={(title) => <ItemTitle >{title}</ItemTitle>}
            />
            <StateList>
              {states.map((state, idx) => (
                <ListItem
                  type={ListItemType.SubListItem}
                  title={ state }
                  onDelete={ () => removeState(stateParentId, idx) }
                  onSubmit={ (text: string) => editState(stateParentId, idx, text) }
                  renderer={(title) => <Tag style={{ marginRight: 8, marginBottom: 8 }}>{title}</Tag>}
                />
              ))}
            </StateList>
          </StateParentWrap>
        ))
      }      
    </Wrap>
  );
};

export default SideNav;
