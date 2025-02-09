import { KanbanWrapper } from '@/components/common';
import { KanbanActionsContext, KanbanDataContext } from '@/components/KanbanBoard/KanbanContext';
import KanbanHeader from '@/components/KanbanBoard/KanbanHeader/KanbanHeader';
import KanbanList from '@/components/KanbanBoard/KanbanList';
import INITIAL_DATA from '@/data/initialData';
import { KanbanDataType } from '@/types/kanban';
import { useState, useEffect, useMemo } from 'react';

const KanbanBoard = () => {
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

  const dataValue = useMemo(() => ({ data, draggedItem }), [data, draggedItem]);
  const actionsValue = useMemo(() => ({ setData, setDraggedItem }), []);

  return (
    <KanbanActionsContext.Provider value={actionsValue}>
      <KanbanDataContext.Provider value={dataValue}>
        <KanbanWrapper>
          <KanbanHeader projectName={data.projectName} />
          <KanbanList columns={data.kanbanColumns} />
        </KanbanWrapper>
      </KanbanDataContext.Provider>
    </KanbanActionsContext.Provider>
  );
};

export default KanbanBoard;
