import styled from 'styled-components';
import XIcon from '@/assets/x.svg?react';
import { CardType } from '@/types/kanban';
import { Circle, TagInput, TextAreaInput } from '@/components/common';
import TagPlusIcon from '@/assets/tagPlus.svg?react';
import { KanbanActionsContext, KanbanDataContext } from '@/components/KanbanBoard/KanbanContext';
import { DragEvent, useContext, useRef, useState } from 'react';
import DotsHorizontal from '@/assets/dotsHorizontal.svg?react';
import useClickOutSide from '@/hooks/useClickOutside';
import { TAG_COLORS } from '@/constants/color';
import { TagColorType } from '@/types/color';
import { motion } from 'framer-motion';
interface KanbanCardProps {
  columnId: string;
  card: CardType;
  index: number;
}

const S = {
  MotionDiv: styled(motion.div)``,

  ListItem: styled.article`
    position: relative;
    background-color: ${({ theme }) => theme.colors.white[100]};
    padding: 2rem 1.8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
    transform: translate(0, 0);
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
    &.dragging {
      opacity: 0.8;
      transform: scale(1.03) rotate(1deg);
      cursor: grabbing;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
      cursor: grab;
    }

    /* 드롭 타겟 표시를 위한 스타일 */
    &.drop-target-top {
      border-top: 2px solid ${({ theme }) => theme.colors.gray[200]};
      transform: translateY(5px);
    }

    &.drop-target-bottom {
      border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
      transform: translateY(-5px);
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

const KanbanCard = ({ columnId, card, index }: KanbanCardProps) => {
  const { setDraggedItem, setData } = useContext(KanbanActionsContext);
  const { draggedItem } = useContext(KanbanDataContext);

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const settingModalRef = useRef<HTMLDivElement>(null);

  useClickOutSide(settingModalRef, () => setIsSettingOpen(false));

  const handleDragStart = (e: DragEvent, sourceColumnId: string, cardId: string) => {
    setDraggedItem({
      sourceColumnId,
      cardId,
      sourceIndex: index,
    });
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: DragEvent) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedItem(null);
    document.querySelectorAll('.drop-target-top, .drop-target-bottom').forEach((el) => {
      el.classList.remove('drop-target-top', 'drop-target-bottom');
    });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !cardRef.current || draggedItem.cardId === card.id) return;

    const cardElement = cardRef.current;
    const rect = cardElement.getBoundingClientRect();
    const midPoint = rect.top + rect.height / 2;

    cardElement.classList.remove('drop-target-top', 'drop-target-bottom');
    if (e.clientY < midPoint) {
      cardElement.classList.add('drop-target-top');
    } else {
      cardElement.classList.add('drop-target-bottom');
    }
  };

  const handleDragLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove('drop-target-top', 'drop-target-bottom');
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !cardRef.current) return;

    const dropPosition = cardRef.current.classList.contains('drop-target-top') ? 'top' : 'bottom';
    const targetIndex = index + (dropPosition === 'bottom' ? 1 : 0);

    setData((prev) => {
      const newData = { ...prev };
      const sourceColumn = newData.kanbanColumns.find((col) => col.columnId === draggedItem.sourceColumnId);
      const targetColumn = newData.kanbanColumns.find((col) => col.columnId === columnId);

      if (!sourceColumn || !targetColumn) return prev;

      const draggedCard = sourceColumn.cards.find((c) => c.id === draggedItem.cardId);
      if (!draggedCard) return prev;

      sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== draggedItem.cardId);

      const adjustedTargetIndex =
        sourceColumn.columnId === targetColumn.columnId && draggedItem.sourceIndex < targetIndex
          ? targetIndex - 1
          : targetIndex;

      targetColumn.cards.splice(adjustedTargetIndex, 0, draggedCard);

      return newData;
    });

    cardRef.current.classList.remove('drop-target-top', 'drop-target-bottom');
  };

  const onClickDeleteItem = (columnId: string, cardId: string) => {
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

  const onClickAddTag = (columnId: string, cardId: string) => {
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

  const onChangeTagName = (value: string, columnId: string, cardId: string) => {
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

  const onChangeCardDescription = (value: string, columnId: string, cardId: string) => {
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

  const onClickTagColor = (color: TagColorType, columnId: string, cardId: string) => {
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

  const handleTagBlur = (columnId: string, cardId: string) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId && card.tag?.tagName === '' ? { ...card, tag: undefined } : card,
              ),
            }
          : column,
      ),
    }));
  };

  return (
    <S.MotionDiv
      layout
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring' }}
      key={card.id}
    >
      <S.ListItem
        ref={cardRef}
        draggable
        onDragStart={(e) => handleDragStart(e, columnId, card.id)}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
        {isSettingOpen && card.tag && (
          <S.SettingModal ref={settingModalRef}>
            {TAG_COLORS.map((color) => (
              <Circle key={color} color={color} onClick={() => onClickTagColor(color, columnId, card.id)} />
            ))}
          </S.SettingModal>
        )}
        {!card.tag && (
          <S.TagPlusIcon
            aria-label='태그 추가'
            width={16}
            height={16}
            onClick={() => onClickAddTag(columnId, card.id)}
          />
        )}
        {card.tag && (
          <TagInput
            color={card.tag.color}
            value={card.tag.tagName}
            onChange={(e) => onChangeTagName(e.target.value, columnId, card.id)}
            onBlur={() => handleTagBlur(columnId, card.id)}
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
    </S.MotionDiv>
  );
};

export default KanbanCard;
