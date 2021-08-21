import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  stateOutputAdded,
  stateOutputUpdated,
  stateOutputRemoveOne,
  stateOutputSelector
} from '@/slices/stateOutputs';

import { useCallback, useState } from 'react';
import { genStateParentId, isContainSpecialChar } from '@/utils';

import {TextInput, ListItem, Tag} from '@/components';
import { ListItemType } from '@/components/ListItem';
import { SectionTitle } from '../SideNav';

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
`

const StateOutputPanel = () => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()
  
  const allStateOutputs = useSelector(stateOutputSelector.selectAll);
  const allOutputNames = allStateOutputs.map(({ title }) => title)
  const allOutputNamesLower = allStateOutputs.map(({ title }) => title.toLowerCase())

  const removeStateOutput = useCallback((stateOutputId: string) => {
    const action = stateOutputRemoveOne(stateOutputId)
    dispatch(action)
  }, [dispatch])

  const addStateOutput = useCallback(() => {
    if (allOutputNamesLower.includes(inputText.toLowerCase())) {
      alert('Name should be unique')
      return 'invalid'
    }
    if (isContainSpecialChar(inputText)) {
      alert('Name should not contain special character')
      return 'invalid'
    }
    const id = genStateParentId()
    const action = stateOutputAdded({
      order: 0,
      title: inputText,
      stateOutputId: id,
    })
    dispatch(action)
  }, [dispatch, inputText, allOutputNamesLower])

  const editStateOutput = useCallback((stateOutputId: string, text: string) => {
    if (allOutputNames.includes(text)) {
      alert('Name should be unique')
      return 'invalid'
    }
    if (isContainSpecialChar(text)) {
      alert('Name should not contain special character')
      return 'invalid'
    }
    const action = stateOutputUpdated({
      id: stateOutputId,
      changes: {
        title: text
      }
    })
    dispatch(action)
  }, [dispatch, allOutputNames])

  const submit = useCallback(() => {
      return addStateOutput()
  }, [addStateOutput])

  return (
    <Wrap>
      {/* <ItemTitle>YTESt</ItemTitle> */}
      <SectionTitle>Outputs</SectionTitle>
      <InputForm>
        <TextInput
          placeholder="Enter a output... ex: LoginPage"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (!inputText) return
              if (submit() !== 'invalid') {
                setInputText('')
              }
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
              // if (window.confirm('Are you sure to remove?')){
                removeStateOutput(stateOutputId)
              // }
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
