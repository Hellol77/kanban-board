import ColumnHeader from '@/components/KanbanBoard/KanbanList/KanbanColumn/ColumnHeader';
import { KanbanColumnType } from '@/types/kanban';
import { DragEvent, useContext, useRef } from 'react';
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
    transition: background-color 0.4s ease;
  `,
};

const KanbanColumn = ({ column }: KanbanColumnProps) => {
  const { setData } = useContext(KanbanActionsContext);
  const { draggedItem } = useContext(KanbanDataContext);
  const columnRef = useRef<HTMLElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !columnRef.current) return;

    if (column.cards.length === 0) {
      columnRef.current.classList.add('drop-target');
    }
  };

  const handleDragLeave = () => {
    if (!columnRef.current) return;
    columnRef.current.classList.remove('drop-target');
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !columnRef.current) return;

    if (column.cards.length === 0) {
      setData((prev) => {
        const newData = { ...prev };
        const sourceColumn = newData.kanbanColumns.find((col) => col.columnId === draggedItem.sourceColumnId);
        const targetColumn = newData.kanbanColumns.find((col) => col.columnId === column.columnId);

        if (!sourceColumn || !targetColumn) return prev;

        const draggedCard = sourceColumn.cards.find((card) => card.id === draggedItem.cardId);
        if (!draggedCard) return prev;

        sourceColumn.cards = sourceColumn.cards.filter((card) => card.id !== draggedItem.cardId);

        targetColumn.cards.push(draggedCard);

        return newData;
      });
    }

    columnRef.current.classList.remove('drop-target');
  };
  return (
    <S.ListColumn ref={columnRef} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <ColumnHeader column={column} setData={setData} />
      {column.cards.length === 0 && <EmptyColumn columnId={column.columnId} />}
      {column.cards.map((card, index) => (
        <KanbanCard key={card.id} card={card} columnId={column.columnId} index={index} />
      ))}
    </S.ListColumn>
  );
};

export default KanbanColumn;
