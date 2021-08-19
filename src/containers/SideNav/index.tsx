import styled, { keyframes } from 'styled-components';
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
import { ItemTitle as RawItemTitle } from '@/components/BlockInfo';

import {TextInput, Button, ListItem} from '@/components';
import { RootState } from '@/store';

const Wrap = styled.div`
  padding: 16px;
`

const ItemTitle = styled(RawItemTitle)`
  &:hover {
    color: #fff;
  }
`

const StateParentWrap = styled.div<{ active: boolean }>`
  cursor: pointer;
  margin: 12px 0;
  padding: 8px 0;
  padding-left: 8px;
  border-radius: 2px;
  background-color: ${({ active, theme }) => active ? 'rgba(255,255,255,.1) !important' : ''};
  padding: ${({ active, theme }) => active ? '8px' : ''};
  transition: all .05s;
  will-change: auto;
  &:hover {
    background-color: rgba(255,255,255,.05);
    /* padding: 8px 12px; */
  }
`

const cursorAnimation = keyframes`
 0% { opacity: 0}
 40% { opacity: 0}
 60% {opacity: 1}
 100% { opacity: 1}
`

const Cursor = styled.span`
  width: 2px;
  margin-left: 1px;
  height: 18px;
  background-color: #aaa;
  position: relative;
  top: 2px;
  display: inline-block;
  animation: ${cursorAnimation} 1.3s infinite;
`;

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
  const [isInputFocus, setIsInputFocus] = useState(false);
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
    if (!inputText) return

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
          hideCursor={
            inputMode === InputMode.StateAdd
          }
          placeholder={
            inputMode === InputMode.StateAdd
              ? `Input a state of "${allNames[activeStateParentIdx]}"`
              : "Input a type... ex: UserStatus, PageStatus"
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onFocus={() => {
            setIsInputFocus(true)
          }}
          onBlur={() => {
            setIsInputFocus(false)
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
              if (inputMode !== InputMode.StateAdd) {
                setActiveStateParentIdx(0)
              } else {
                if (activeStateParentIdx === allIds.length - 1) {
                  setInputMode(DEFAULT_INPUT_MODE)
                  setActiveStateParentIdx(0)
                } else {
                  setActiveStateParentIdx(activeStateParentIdx + 1)
                }
              }
              
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
              onDelete={ (e) => {
                e.stopPropagation()
                if (window.confirm('Are you sure to remove?')){
                  setInputMode(InputMode.StateParentAdd)
                  removeStateParent(stateParentId)
                }
              }}
              onEndEdit={() => setInputMode(InputMode.StateParentAdd)}
              onStartEdit={() => setInputMode(InputMode.StateParentEdit)}
              onSubmit={ (text: string) => editStateParent(stateParentId, text) }
              renderer={(title) => <ItemTitle >{title}</ItemTitle>}
            />
            <StateList>
              {
                (
                  inputMode === InputMode.StateAdd && activeStateParentIdx === i && isInputFocus
                  ? [...states, 'cursor']
                  : states 
                ).map((state, idx) => (
                <ListItem
                  isSolidDelete
                  type={ListItemType.SubListItem}
                  title={ state }
                  onDelete={ (e) => {
                    e.stopPropagation()
                    removeState(stateParentId, idx)
                  }}
                  onEndEdit={() => setInputMode(InputMode.StateParentAdd)}
                  onStartEdit={() => setInputMode(InputMode.StateEdit)}
                  onSubmit={ (text: string) => editState(stateParentId, idx, text) }
                  renderer={(title) =>
                    state === 'cursor'
                      ? <>
                        { inputText }<Cursor />
                      </>
                      : <Tag style={{ marginRight: 8, marginBottom: 8 }}>{title}</Tag>
                }
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
