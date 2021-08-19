import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  stateOutputAdded,
  stateOutputUpdated,
  stateOutputRemoveOne,
  stateOutputSelector
} from '@/slices/stateOutputs';

import { useCallback, useState } from 'react';
import { genStateParentId } from '@/utils';
import { ItemTitle } from '@/components/BlockInfo';

import {TextInput, Button, ListItem, Tag} from '@/components';
import { ListItemType } from '@/components/ListItem';

const Wrap = styled.div`
  padding: 16px;
`

const InputForm = styled.div`
  display: flex;
  margin-bottom: 15px;
`

const OutputWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* padding: 4px 8px;
  border: 1px solid #555;
  margin-bottom: 12px;
  border-radius: 2px; */
`

const StateOutputPanel = () => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()
  
  const allStateOutputs = useSelector(stateOutputSelector.selectAll);
  const allOutputNames = allStateOutputs.map(({ title }) => title)

  const removeStateOutput = useCallback((stateOutputId: string) => {
    const action = stateOutputRemoveOne(stateOutputId)
    dispatch(action)
  }, [dispatch])

  const addStateOutput = useCallback(() => {
    if (allOutputNames.includes(inputText)) {
      return alert('Name should be unique')
    }
    const id = genStateParentId()
    const action = stateOutputAdded({
      order: 0,
      title: inputText,
      stateOutputId: id,
    })
    dispatch(action)
  }, [dispatch, inputText])

  const editStateOutput = useCallback((stateOutputId: string, text: string) => {
    if (allOutputNames.includes(text)) {
      return alert('Name should be unique')
    }
    const action = stateOutputUpdated({
      id: stateOutputId,
      changes: {
        title: text
      }
    })
    dispatch(action)
  }, [dispatch])

  const submit = useCallback(() => {
      addStateOutput()
  }, [addStateOutput])

  return (
    <Wrap>
      {/* <ItemTitle>YTESt</ItemTitle> */}
      <InputForm>
        <TextInput
          placeholder="Enter a output..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (!inputText) return
              submit()
              setInputText('')
            }
          }}
          type="text"
        />
      </InputForm>

      <OutputWrap>
      {
        allStateOutputs.map(({ title, stateOutputId }) => (
            <ListItem
              isSolidDelete
              type={ListItemType.SubListItem}
              title={title}
              onDelete={ (e) => {
                e.stopPropagation()
                if (window.confirm('Are you sure to remove?')){
                  removeStateOutput(stateOutputId)
                }
              }}
              onSubmit={ (text: string) => editStateOutput(stateOutputId, text) }
              renderer={(title) => <Tag style={{ marginRight: 8, marginBottom: 8 }}>{ title }</Tag>}
            />
        ))
      }      
      </OutputWrap>
    </Wrap>
  );
};

export default StateOutputPanel;
