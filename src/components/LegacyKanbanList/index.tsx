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

const LegacyKanbanList = () => {
  const [data, setData] = useState<KanbanDataType>(() => {
    const localData = localStorage.getItem('kanban');
    return localData ? JSON.parse(localData) : INITIAL_DATA;
  });
  const [draggedItem, setDraggedItem] = useState<{
    sourcecolumnId: number;
    cardId: number;
  } | null>(null);
  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(data));
  }, [data]);

  const onChangeProjectName = (value: string) => setData((prev) => ({ ...prev, projectName: value }));

  const onChangeColumnTitle = (value: string, id: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === id ? { ...column, title: value } : column,
      ),
    }));
  };

  const onChangeCardDescription = (value: string, columnId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: column.cards.map((card) => (card.id === cardId ? { ...card, description: value } : card)),
            }
          : column,
      ),
    }));
  };

  const onClickAddCard = (columnId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: [
                ...column.cards,
                {
                  id: column.cards.length + 1,
                  tag: { tagName: '무제', color: 'black' },
                  description: '',
                },
              ],
            }
          : column,
      ),
    }));
  };

  const onClickAddColumn = () => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: [
        ...prev.kanbanColumns,
        {
          columnId: prev.kanbanColumns.length + 1,
          title: '무제',
          cards: [],
        },
      ],
    }));
  };

  const onChangeTagName = (value: string, columnId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId ? { ...card, tag: { tagName: value, color: 'black' } } : card,
              ),
            }
          : column,
      ),
    }));
  };

  const onClickAddTag = (columnId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId ? { ...card, tag: { tagName: '무제', color: 'black' } } : card,
              ),
            }
          : column,
      ),
    }));
  };

  const onClickDeleteItem = (columnId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            }
          : column,
      ),
    }));
  };

  const onClickDeleteColumn = (columnId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.filter((column) => column.columnId !== columnId),
    }));
  };

  const handleDragStart = (e: DragEvent, sourcecolumnId: number, cardId: number) => {
    setDraggedItem({ sourcecolumnId, cardId });
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: DragEvent) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedItem(null);
    document.querySelectorAll('.drop-target').forEach((el) => {
      el.classList.remove('drop-target');
    });
  };

  const handleDragOver = (e: DragEvent, columnId: number) => {
    e.preventDefault();
    if (draggedItem && draggedItem.sourcecolumnId !== columnId) {
      e.currentTarget.classList.add('drop-target');
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove('drop-target');
  };

  const handleDrop = (e: DragEvent, targetcolumnId: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-target');

    if (!draggedItem || draggedItem.sourcecolumnId === targetcolumnId) return;

    setData((prev) => {
      const sourceList = prev.kanbanColumns.find((list) => list.columnId === draggedItem.sourcecolumnId);
      const cardToMove = sourceList?.cards.find((card) => card.id === draggedItem.cardId);

      if (!sourceList || !cardToMove) return prev;

      return {
        ...prev,
        kanbanColumns: prev.kanbanColumns.map((list) => {
          if (list.columnId === draggedItem.sourcecolumnId) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== draggedItem.cardId),
            };
          }
          if (list.columnId === targetcolumnId) {
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
        {data.kanbanColumns.map((column) => (
          <S.ListColumn
            key={column.columnId}
            onDragOver={(e) => handleDragOver(e, column.columnId)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.columnId)}
          >
            <S.ListTitle>
              <S.ListTitleWrapper>
                <TextInput
                  variant='h2'
                  role='heading'
                  aria-label='컬럼 제목'
                  aria-level={2}
                  value={column.title}
                  placeholder='무제'
                  onChange={(e) => onChangeColumnTitle(e.target.value, column.columnId)}
                />
                {column.cards.length !== 0 && <Badge count={column.cards.length} />}
              </S.ListTitleWrapper>
              {column.cards.length !== 0 && (
                <Button onClick={() => onClickAddCard(column.columnId)} icon={<PlusIcon />} aria-label='카드 추가' />
              )}
              {column.cards.length === 0 && column.columnId > 3 && (
                <Button
                  onClick={() => onClickDeleteColumn(column.columnId)}
                  icon={<XIcon width={16} />}
                  aria-label='컬럼 삭제'
                />
              )}
            </S.ListTitle>
            {column.cards.length === 0 && (
              <S.ListEmptyItem>
                <Text color='gray' variant='sub'>
                  지금 바로 추가해보세요.
                </Text>
                <Button onClick={() => onClickAddCard(column.columnId)} icon={<PlusIcon />} aria-label='카드 추가' />
              </S.ListEmptyItem>
            )}
            {column.cards.map((card) => (
              <S.ListItem
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, column.columnId, card.id)}
                onDragEnd={handleDragEnd}
              >
                <S.XIcon
                  aria-label='카드 삭제'
                  width={14}
                  height={14}
                  onClick={() => onClickDeleteItem(column.columnId, card.id)}
                />
                {!card.tag?.tagName && (
                  <S.TagPlusIcon
                    aria-label='태그 추가'
                    width={16}
                    height={16}
                    onClick={() => onClickAddTag(column.columnId, card.id)}
                  />
                )}
                {card.tag?.tagName && (
                  <TagInput
                    color={card.tag.color}
                    value={card.tag.tagName}
                    onChange={(e) => onChangeTagName(e.target.value, column.columnId, card.id)}
                  />
                )}
                <TextAreaInput
                  placeholder='카드 설명을 입력해주세요.'
                  value={card?.description || ''}
                  onChange={(e) => onChangeCardDescription(e.target.value, column.columnId, card.id)}
                >
                  {card.description}
                </TextAreaInput>
              </S.ListItem>
            ))}
          </S.ListColumn>
        ))}
        <S.AddListWrapper>
          <Button
            onClick={() => onClickAddColumn()}
            icon={<PlusIcon />}
            aria-label='칼럼 추가'
            text='Add another list'
          />
        </S.AddListWrapper>
      </S.ListWrapper>
    </KanbanWrapper>
  );
};

export default LegacyKanbanList;
