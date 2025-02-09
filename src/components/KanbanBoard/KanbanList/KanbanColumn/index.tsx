import ColumnHeader from '@/components/KanbanBoard/KanbanList/KanbanColumn/ColumnHeader';
import { KanbanColumnType } from '@/types/kanban';
import { DragEvent, useContext } from 'react';
import styled from 'styled-components';
import EmptyColumn from '@/components/KanbanBoard/KanbanList/KanbanColumn/EmptyColumn';
import KanbanCard from '@/components/KanbanBoard/KanbanList/KanbanColumn/KanbanCard';
import { KanbanActionsContext, KanbanDataContext } from '@/components/KanbanBoard/KanbanContext';

interface KanbanColumnProps {
  column: KanbanColumnType;
}

const S = {
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
};

const KanbanColumn = ({ column }: KanbanColumnProps) => {
  const { setData } = useContext(KanbanActionsContext);
  const { draggedItem } = useContext(KanbanDataContext);
  const handleDragOver = (e: DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem.sourcecolumnId !== columnId) {
      e.currentTarget.classList.add('drop-target');
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove('drop-target');
  };

  const handleDrop = (e: DragEvent, targetcolumnId: string) => {
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
    <S.ListColumn
      onDragOver={(e) => handleDragOver(e, column.columnId)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, column.columnId)}
    >
      <ColumnHeader column={column} setData={setData} />
      {column.cards.length === 0 && <EmptyColumn columnId={column.columnId} />}
      {column.cards.map((card) => (
        <KanbanCard key={card.id} card={card} columnId={column.columnId} />
      ))}
    </S.ListColumn>
  );
};

export default KanbanColumn;
