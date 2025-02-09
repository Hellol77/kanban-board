import { Badge, Button, KanbanWrapper, TagInput, Text, TextAreaInput, TextInput } from '@/components/common';
import { KanbanDataType } from '@/types/kanban';
import { DragEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import PlusIcon from '@/assets/plus.svg?react';
import XIcon from '@/assets/x.svg?react';
import TagPlusIcon from '@/assets/tagPlus.svg?react';
import INITIAL_DATA from '@/data/initialData';

const S = {
  ListWrapper: styled.div`
    display: flex;
    overflow-x: auto;
    height: 100vh;
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
    &.drop-target {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
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
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
    &.dragging {
      opacity: 0.5;
      cursor: grabbing;
    }
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

const KanbanList = () => {
  const [data, setData] = useState<KanbanDataType>(() => {
    const localData = localStorage.getItem('kanban');
    return localData ? JSON.parse(localData) : INITIAL_DATA;
  });
  const [draggedItem, setDraggedItem] = useState<{
    sourceListId: number;
    cardId: number;
  } | null>(null);
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

  const handleDragStart = (e: DragEvent, sourceListId: number, cardId: number) => {
    setDraggedItem({ sourceListId, cardId });
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: DragEvent) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedItem(null);
    document.querySelectorAll('.drop-target').forEach((el) => {
      el.classList.remove('drop-target');
    });
  };

  const handleDragOver = (e: DragEvent, listId: number) => {
    e.preventDefault();
    if (draggedItem && draggedItem.sourceListId !== listId) {
      e.currentTarget.classList.add('drop-target');
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove('drop-target');
  };

  const handleDrop = (e: DragEvent, targetListId: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-target');

    if (!draggedItem || draggedItem.sourceListId === targetListId) return;

    setData((prev) => {
      const sourceList = prev.kanbanList.find((list) => list.listId === draggedItem.sourceListId);
      const cardToMove = sourceList?.cards.find((card) => card.id === draggedItem.cardId);

      if (!sourceList || !cardToMove) return prev;

      return {
        ...prev,
        kanbanList: prev.kanbanList.map((list) => {
          if (list.listId === draggedItem.sourceListId) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== draggedItem.cardId),
            };
          }
          if (list.listId === targetListId) {
            return {
              ...list,
              cards: [...list.cards, cardToMove],
            };
          }
          return list;
        }),
      };
    });
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
          <S.ListColumn
            key={list.listId}
            onDragOver={(e) => handleDragOver(e, list.listId)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, list.listId)}
          >
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
              {list.cards.length === 0 && list.listId > 3 && (
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
              <S.ListItem
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, list.listId, card.id)}
                onDragEnd={handleDragEnd}
              >
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
