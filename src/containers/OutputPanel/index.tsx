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

import {TextInput, Button, ListItem} from '@/components';

const Wrap = styled.div`
  padding: 16px;
`

const InputForm = styled.div`
  display: flex;
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
        <span style={{ flex: 1 }}>

        <TextInput
          placeholder="Enter your password..."
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
        </span>
        <span style={{ marginLeft: 8 }}>
          <Button onClick={submit}>
            OK
          </Button>
        </span>
      </InputForm>

      {
        allStateOutputs.map(({ title, stateOutputId }) => (
          <div>
            <ListItem
              title={title}
              onDelete={ () => {
                if (window.confirm('Are you sure to remove?')){
                  removeStateOutput(stateOutputId)
                }
              }}
              onSubmit={ (text: string) => editStateOutput(stateOutputId, text) }
              renderer={(title) => <ItemTitle>{ title }</ItemTitle>}
            />
          </div>
        ))
      }      
    </Wrap>
  );
};

export default StateOutputPanel;
