import KanbanColumn from '@/components/KanbanBoard/KanbanList/KanbanColumn';
import { KanbanColumnType } from '@/types/kanban';
import styled from 'styled-components';

interface KanbanListProps {
  columns: KanbanColumnType[];
}

const S = {
  ListWrapper: styled.div`
    display: flex;
    overflow-x: auto;
    height: 100vh;
    gap: 16px;
    width: 100%;
    max-width: calc(200px * 4 + 16px * 3);
  `,
};

const KanbanList = ({ columns }: KanbanListProps) => {
  return (
    <S.ListWrapper>
      {columns.map((column) => (
        <KanbanColumn key={column.columnId} column={column} />
      ))}
    </S.ListWrapper>
  );
};

export default KanbanList;
