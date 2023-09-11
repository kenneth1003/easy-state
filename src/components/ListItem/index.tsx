import { consumeTheme } from '@/style/vars';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const InlineEditInput = styled.input`
  width: 100px;
`;

const Delete = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -5px;
  font-size: 24px;
  display: none;
  color: #999;
  &:after {
    content: '×'
  }
  &:hover {
    color: #fff;
  }
`

const DeleteSolid = styled.div`
  cursor: pointer;
  position: absolute;
  border-radius: 1px;
  right: 12px;
  top: 0;
  font-size: 16px;
  padding: 0 4px;
  font-weight: bold;
  display: none;
  color: #000;
  background-color: ${consumeTheme('main')};
  &:after {
    content: '×'
  }
`

const MainWrap = styled.div`
  cursor: text;
  position: relative;
  &:hover {
    ${Delete} {
      display: block;
    }
    ${DeleteSolid} {
      display: block;
    }
    ${Tag} {
      transition: none;
      color: #fff !important;
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
  isSolidDelete?: boolean;
  onSubmit: (...args: any[]) => any;
  onDelete: (...args: any[]) => any;
  onStartEdit?: (...args: any[]) => any;
  onEndEdit?: (...args: any[]) => any;
  renderer?: (...args: any[]) => any;
}

const ListItem = ({
  type,
  title,
  isSolidDelete,
  onSubmit,
  onDelete,
  onStartEdit,
  onEndEdit,
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

  const startEdit = useCallback((e) => {
    e.stopPropagation()
    setIsEdit(true)
    setInputText(originalTitle)
    onStartEdit && onStartEdit()
    Promise.resolve().then(() => {
      inputEl.current?.focus()
    })
  }, [originalTitle, onStartEdit])

  const cancelEdit = useCallback(() => {
    onEndEdit && onEndEdit()
    setIsEdit(false)
    setInputText(originalTitle)
  }, [originalTitle, onEndEdit])

  return (
    <Wrap>
        <Title
          onClick={startEdit}
        >
          {
            renderer(
              <>
                { !isEdit && title }
                <InlineEditInput
                  style={{
                    display: isEdit ? 'inline-block' : 'none',
                    ...(
                      isSolidDelete
                        ? {}
                        : {
                          width: '100%'
                        }
                    )
                  }}
                  ref={inputEl}
                  placeholder=""
                  value={inputText}
                  onBlur={cancelEdit}
                  onChange={(e) => {
                    setInputText(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!inputText) return
                      onSubmit(inputText)
                      cancelEdit()
                    } else if (e.key === 'Escape') {
                      cancelEdit()
                    }
                  }}
                />
              </>
            )
          }
        </Title>
      
      { !isEdit  && (
        isSolidDelete
          ? <DeleteSolid onClick={onDelete} />
          : <Delete onClick={onDelete} />
      )
       }
      
    </Wrap>
  );
};

export default ListItem;
