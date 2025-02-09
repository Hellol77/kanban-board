import { Badge, Button, KanbanWrapper, TagInput, Text, TextAreaInput, TextInput } from '@/components/common';
import { KanbanDataType } from '@/types/kanban';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlusIcon from '@/assets/plus.svg?react';
import XIcon from '@/assets/x.svg?react';
import TagPlusIcon from '@/assets/tagPlus.svg?react';

const S = {
  ListWrapper: styled.div`
    display: flex;
    overflow-x: auto;
    height: 100%;
    gap: 16px;
    width: 100%;
    max-width: calc(200px * 4 + 16px * 3);
  `,

  ListColumn: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    height: 11.2rem;
    flex: 0 0 20rem;
    border-radius: 8px;
    height: 100%;
    overflow-y: auto;
  `,

  ListTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  ListTitleWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
  `,

  ListItem: styled.article`
    position: relative;
    background-color: ${({ theme }) => theme.colors.white[100]};
    padding: 2rem 1.8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  `,

  ListItemTag: styled.div`
    display: flex;
    width: fit-content;
    padding: 0.1rem 0.8rem;
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: 600;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray[100]};
  `,

  ListItemDescription: styled.span`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    color: ${({ theme }) => theme.colors.black.text1};
    font-weight: 400;
  `,

  ListEmptyItem: styled.article`
    display: flex;
    flex-direction: column;
    padding: 2rem 1.8rem;
    height: 11rem;
    background-color: ${({ theme }) => theme.colors.white[100]};
    justify-content: center;
    border-radius: 10px;
    gap: 1.3rem;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.body1};
    color: ${({ theme }) => theme.colors.gray.text1};
  `,

  AddListWrapper: styled.div`
    flex-shrink: 0;
    padding: 0.8rem 0;
  `,

  XIcon: styled(XIcon)`
    position: absolute;
    top: 0.4rem;
    right: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    stroke: ${({ theme }) => theme.colors.white[200]};
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
  `,

  TagPlusIcon: styled(TagPlusIcon)`
    position: absolute;
    top: 0.3rem;
    right: 3rem;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
  `,
};

const initialData: KanbanDataType = {
  projectName: 'Project No.1',
  kanbanList: [
    {
      listId: 1,
      title: '시작 전',
      cards: [
        {
          id: 1,
          tag: { tagName: 'tag1', color: 'black' },
          description: '안녕하세요ㅕㅇ창ㄴㅊㅇ너 안그애라얼',
        },
        { id: 2, tag: { tagName: 'tag1', color: 'black' }, description: 'description2' },
        { id: 3, tag: { tagName: 'tag1', color: 'black' }, description: 'description3' },
      ],
    },
    {
      listId: 2,
      title: '진행 중',
      cards: [],
    },
    {
      listId: 3,
      title: '완료',
      cards: [],
    },
  ],
};

const KanbanList = () => {
  const [data, setData] = useState<KanbanDataType>(() => {
    const localData = localStorage.getItem('kanban');
    return localData ? initialData : initialData;
  });

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(data));
  }, [data]);

  const onChangeProjectName = (value: string) => setData((prev) => ({ ...prev, projectName: value }));

  const onChangeListTitle = (value: string, id: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) => (list.listId === id ? { ...list, title: value } : list)),
    }));
  };

  const onChangeCardDescription = (value: string, listId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) =>
        list.listId === listId
          ? {
              ...list,
              cards: list.cards.map((card) => (card.id === cardId ? { ...card, description: value } : card)),
            }
          : list,
      ),
    }));
  };

  const onClickAddCard = (listId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) =>
        list.listId === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: list.cards.length + 1,
                  tag: { tagName: 'tag1', color: 'black' },
                  description: '',
                },
              ],
            }
          : list,
      ),
    }));
  };

  const onClickAddList = () => {
    setData((prev) => ({
      ...prev,
      kanbanList: [
        ...prev.kanbanList,
        {
          listId: prev.kanbanList.length + 1,
          title: 'list',
          cards: [],
        },
      ],
    }));
  };

  const onChangeTagName = (value: string, listId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) =>
        list.listId === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, tag: { tagName: value, color: 'black' } } : card,
              ),
            }
          : list,
      ),
    }));
  };

  const onClickAddTag = (listId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) =>
        list.listId === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, tag: { tagName: '무제', color: 'black' } } : card,
              ),
            }
          : list,
      ),
    }));
  };

  const onClickDeleteItem = (listId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) =>
        list.listId === listId
          ? {
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            }
          : list,
      ),
    }));
  };

  const onClickDeleteListColumn = (listId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.filter((list) => list.listId !== listId),
    }));
  };

  return (
    <KanbanWrapper>
      <TextInput
        role='heading'
        aria-label='프로젝트 제목'
        aria-level={1}
        variant='h1'
        value={data.projectName}
        placeholder='프로젝트 제목을 입력해주세요.'
        onChange={(e) => onChangeProjectName(e.target.value)}
      />
      <S.ListWrapper>
        {data.kanbanList.map((list) => (
          <S.ListColumn key={list.listId}>
            <S.ListTitle>
              <S.ListTitleWrapper>
                <TextInput
                  variant='h2'
                  role='heading'
                  aria-label='컬럼 제목'
                  aria-level={2}
                  value={list.title}
                  placeholder='무제'
                  onChange={(e) => onChangeListTitle(e.target.value, list.listId)}
                />
                {list.cards.length !== 0 && <Badge count={list.cards.length} />}
              </S.ListTitleWrapper>
              {list.cards.length !== 0 && (
                <Button onClick={() => onClickAddCard(list.listId)} icon={<PlusIcon />} aria-label='카드 추가' />
              )}
              {list.cards.length === 0 && (
                <Button
                  onClick={() => onClickDeleteListColumn(list.listId)}
                  icon={<XIcon width={16} />}
                  aria-label='컬럼 삭제'
                />
              )}
            </S.ListTitle>
            {list.cards.length === 0 && (
              <S.ListEmptyItem>
                <Text color='gray' variant='sub'>
                  지금 바로 추가해보세요.
                </Text>
                <Button onClick={() => onClickAddCard(list.listId)} icon={<PlusIcon />} aria-label='카드 추가' />
              </S.ListEmptyItem>
            )}
            {list.cards.map((card) => (
              <S.ListItem key={card.id}>
                <S.XIcon width={14} height={14} onClick={() => onClickDeleteItem(list.listId, card.id)} />
                {!card.tag?.tagName && (
                  <S.TagPlusIcon width={16} height={16} onClick={() => onClickAddTag(list.listId, card.id)} />
                )}
                {card.tag?.tagName && (
                  <TagInput
                    value={card.tag.tagName}
                    onChange={(e) => onChangeTagName(e.target.value, list.listId, card.id)}
                  />
                )}
                <TextAreaInput
                  placeholder='카드 설명을 입력해주세요.'
                  value={card?.description || ''}
                  onChange={(e) => onChangeCardDescription(e.target.value, list.listId, card.id)}
                >
                  {card.description}
                </TextAreaInput>
              </S.ListItem>
            ))}
          </S.ListColumn>
        ))}
        <S.AddListWrapper>
          <Button onClick={() => onClickAddList()} icon={<PlusIcon />} aria-label='칼럼 추가' text='Add another list' />
        </S.AddListWrapper>
      </S.ListWrapper>
    </KanbanWrapper>
  );
};

export default KanbanList;
