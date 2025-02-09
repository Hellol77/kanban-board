import styled from 'styled-components';
import XIcon from '@/assets/x.svg?react';
import { CardType } from '@/types/kanban';
import { Circle, TagInput, TextAreaInput } from '@/components/common';
import TagPlusIcon from '@/assets/tagPlus.svg?react';
import { KanbanActionsContext } from '@/components/KanbanBoard/KanbanContext';
import { DragEvent, useContext, useRef, useState } from 'react';
import DotsHorizontal from '@/assets/dotsHorizontal.svg?react';
import useClickOutSide from '@/hooks/useClickOutside';
import { TAG_COLORS } from '@/constants/color';
import { TagColorType } from '@/types/color';
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
  dotsHorizontal: styled(DotsHorizontal)`
    position: absolute;
    top: 0.4rem;
    right: 3rem;
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

  SettingModal: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 4rem;
    z-index: 10;
    top: 3rem;
    left: 15rem;
    border-radius: 6px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.white[100]};
  `,
};

const KanbanCard = ({ columnId, card }: KanbanCardProps) => {
  const { setDraggedItem, setData } = useContext(KanbanActionsContext);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const settingModalRef = useRef<HTMLDivElement>(null);
  useClickOutSide(settingModalRef, () => setIsSettingOpen(false));
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

  const onClickTagColor = (color: TagColorType, columnId: number, cardId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? { ...card, tag: card.tag ? { tagName: card.tag.tagName, color } : { tagName: '', color } }
                  : card,
              ),
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
      {card.tag?.tagName && (
        <S.dotsHorizontal
          onClick={() => setIsSettingOpen((prev) => !prev)}
          aria-label='태그 추가'
          width={16}
          height={16}
        />
      )}
      {isSettingOpen && card.tag?.tagName && (
        <S.SettingModal ref={settingModalRef}>
          {TAG_COLORS.map((color) => (
            <Circle key={color} color={color} onClick={() => onClickTagColor(color, columnId, card.id)} />
          ))}
        </S.SettingModal>
      )}
      {!card.tag?.tagName && (
        <S.TagPlusIcon aria-label='태그 추가' width={16} height={16} onClick={() => onClickAddTag(columnId, card.id)} />
      )}
      {card.tag?.tagName && (
        <TagInput
          color={card.tag.color}
          value={card.tag.tagName}
          onChange={(e) => onChangeTagName(e.target.value, columnId, card.id)}
        />
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
