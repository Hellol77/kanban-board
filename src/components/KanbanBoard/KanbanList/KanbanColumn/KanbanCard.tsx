import styled from 'styled-components';
import XIcon from '@/assets/x.svg?react';
import { CardType } from '@/types/kanban';
import { TagInput, TextAreaInput } from '@/components/common';
import TagPlusIcon from '@/assets/tagPlus.svg?react';
import { KanbanContext } from '@/components/KanbanBoard/KanbanContext';
import { DragEvent, useContext } from 'react';

interface KanbanCardProps {
  columnId: number;
  card: CardType;
}

const S = {
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

const KanbanCard = ({ columnId, card }: KanbanCardProps) => {
  const { setDraggedItem, setData } = useContext(KanbanContext);

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

  return (
    <S.ListItem
      key={card.id}
      draggable
      onDragStart={(e) => handleDragStart(e, columnId, card.id)}
      onDragEnd={handleDragEnd}
    >
      <S.XIcon aria-label='카드 삭제' width={14} height={14} onClick={() => onClickDeleteItem(columnId, card.id)} />
      {!card.tag?.tagName && (
        <S.TagPlusIcon aria-label='태그 추가' width={16} height={16} onClick={() => onClickAddTag(columnId, card.id)} />
      )}
      {card.tag?.tagName && (
        <TagInput value={card.tag.tagName} onChange={(e) => onChangeTagName(e.target.value, columnId, card.id)} />
      )}
      <TextAreaInput
        placeholder='카드 설명을 입력해주세요.'
        value={card?.description || ''}
        onChange={(e) => onChangeCardDescription(e.target.value, columnId, card.id)}
      >
        {card.description}
      </TextAreaInput>
    </S.ListItem>
  );
};

export default KanbanCard;
