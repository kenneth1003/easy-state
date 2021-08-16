import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';


const InlineEditInput = styled.input`
  
`

const Delete = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: none;
  &:after {
    content: 'X'
  }
`

const MainWrap = styled.div`
  cursor: pointer;
  position: relative;
  &:hover {
    ${Delete} {
      display: block;
    }
  }
`

const Title = styled.div``

export enum ListItemType {
  SubListItem
}

interface Props {
  type?: ListItemType;
  title: string;
  onSubmit: (...args: any[]) => any;
  onDelete: (...args: any[]) => any;
  renderer?: (...args: any[]) => any;
}

const ListItem = ({
  type,
  title,
  onSubmit,
  onDelete,
  renderer = (title) => title
}: Props) => {
  const Wrap = MainWrap

  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState('');
  const [originalTitle, setOriginalTitle] = useState(title);
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setOriginalTitle(title)
  }, [title])

  const startEdit = useCallback(() => {
    setIsEdit(true)
    setInputText(originalTitle)
    Promise.resolve().then(() => {
      inputEl.current?.focus()
    })
  }, [originalTitle])

  const cancelEdit = useCallback(() => {
    setIsEdit(false)
    setInputText(originalTitle)
  }, [originalTitle])

  return (
    <Wrap>
      {/* <Title onClick={startEdit}>{renderer(title)}</Title>  */}
        <Title
          onClick={startEdit}
        >
          {
            renderer(
              <>
                { !isEdit && <span>{title}</span> }
                <InlineEditInput
                  style={{
                    display: isEdit ? 'block' : 'none'
                  }}
                  ref={inputEl}
                  placeholder="Enter your password..."
                  value={inputText}
                  onBlur={cancelEdit}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!inputText) return
                      onSubmit(inputText)
                      cancelEdit()
                    } else if (e.key === 'Escape') {
                      cancelEdit()
                      // setInputMode(DEFAULT_INPUT_MODE)
                    }
                  }}
                />
              </>
            )
          }
        </Title>
      
      { !isEdit  && <Delete onClick={onDelete} /> }
      
    </Wrap>
  );
};

export default ListItem;
